class Activity extends DataRepository {
  constructor(id, dataSet) {
    super(id, dataSet);
    // this.userId = id;
    // this.date = data.date;
    // this.steps = dataSet.steps;
    // this.minutesActive = data.minutesActive;
    // this.flightsOfStairs = data.flightsOfStairs;
    // this.milesWalked = 0;
    // this.reachedStepGoal = null;
    // this.totalStepsThisWeek = 0; 
    // this.activityRecord = [];
    // this.accomplishedDays = []; - activity (stepsExceededDays???)
    // this.trendingStepDays = []; -  # of days in a row that step goal has been exceeded - activity
    // this.trendingStairsDays = []; - # of days in a row that ?????  - activity
    // this.friendsActivityRecords = [] - activity

    // this.doActivity(userRepository);
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

  getAverageActivityThruWeek(id, endDate) {
    return this.getWeeklyAverage(id, 'minutesActive', endDate)
    // add another parameter to get weekly average that is the id?
  }

  getAverageStepsThruWeek(id, endDate) {
    return this.getWeeklyAverage(id, 'numSteps', endDate)
    // add another parameter to get weekly average that is the id?
  }

  getAverageFlightsThruWeek(id, endDate) {
    return this.getWeeklyAverage(id, 'flightsOfStairs', endDate)
    // add another parameter to get weekly average that is the id?
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

  getAverageStepsOnDay(date) {
    return this.getAverageDaily('numSteps', date);
  };

  getAverageMinutesOnDay(date) {
    return this.getAverageDaily('minutesActive', date);
  }

  getAverageFlightsOnDay(date) {
    return this.getAverageDaily('flightsOfStairs', date);
  }

  getAverageDaily(stat, date) {
    const allUserDataDate = this.dataSet(date);
    return allUserDataDate.reduce((total, user) => {
      total += user[stat];
      return total;
    }, 0) / allUserDataDate.length;
  };
}

   

}