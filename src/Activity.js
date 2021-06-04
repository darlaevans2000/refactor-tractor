class Activity extends DataRepository {
  constructor(id, dataSet) {
    super(id, dataSet);
  }

  getStepsTaken(date, id) {
    return this.getGivenDayValue(date, id, 'numSteps');
    //add id as a parameter getGivenDayValue?
  }

  getMinutesActive(date, id) {
    return this.getGivenDayValue(date, id, 'minutesActive');
    //add id as a parameter getGivenDayValue?
  }

  getFlightsClimbed(date, id) {
    return this.getGivenDayValue(date, id, 'flightsOfStairs');
    //add id as a parameter getGivenDayValue?
  }

  getMilesWalked(date, user) {
    let steps = this.getStepsTaken(date, user.id)
    let strideLength = user.strideLength;
    return (steps === null ? null : steps * strideLength / 5280);
  };

  getAvgActivityThruWeek(id, endDate) {
    return this.getWeeklyAverage(id, 'minutesActive', endDate)
    // add another parameter to get weekly average that is the id?
  }

  getAvgStepsThruWeek(id, endDate) {
    return this.getWeeklyAverage(id, 'numSteps', endDate)
    // add another parameter to get weekly average that is the id?
  }

  getAvgFlightsThruWeek(id, endDate) {
    return this.getWeeklyAverage(id, 'flightsOfStairs', endDate)
    // add another parameter to get weekly average that is the id?
  }

  getAvgStepsOnDay(date) {
    return this.getAvgDaily('numSteps', date);
  };

  getAvgMinutesOnDay(date) {
    return this.getAvgDaily('minutesActive', date);
  }

  getAvgFlightsOnDay(date) {
    return this.getAvgDaily('flightsOfStairs', date);
  }

  achievedGoal(user, day) {
    if (user === undefined || day === undefined || user.id !== day.userID) return null;
    return day.numSteps > user.dailyStepGoal;
  };

  getDaysAchievedGoal(user) {
    let daysAchieved = this.dataSet.filter((date) => {
      return this.achievedGoal(user, date)
    })
    return daysAchieved || [];
  };

  getStairRecord(user) {
    if(this.findUserData(user.id, users).length ===0) {
      return null;
    }
    return this.findUserData(user.id, users).reduce((a, b) => {
      return (b.userID === user.id ? Math.max(a, b.flightsOfStairs) : a);
    }, 0);
    // we may have to change findUserData a little to get this working
  };

  getAvgDaily(stat, date) {
    const userDataDate = this.dataSet(date);
    return userDataDate.reduce((total, user) => {
      total += user[stat];
      return total;
    }, 0) / userDataDate.length;
  }

findFriendsTotalStepsForWeek(users, date) {
    this.friends.map(friend => {
      let matchedFriend = users.find(user => user.id === friend);
      matchedFriend.calculateTotalStepsThisWeek(date);
      this.friendsActivityRecords.push(
        {
          'id': matchedFriend.id,
          'firstName': matchedFriend.name.toUpperCase().split(' ')[0],
          'totalWeeklySteps': matchedFriend.totalStepsThisWeek
        })
    })
    this.calculateTotalStepsThisWeek(date);
    this.friendsActivityRecords.push({
      'id': this.id,
      'firstName': 'YOU',
      'totalWeeklySteps': this.totalStepsThisWeek
    });
    this.friendsActivityRecords = this.friendsActivityRecords.sort((a, b) => b.totalWeeklySteps - a.totalWeeklySteps);
  }
  
}