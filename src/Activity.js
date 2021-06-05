import DataRepository from './DataRepository';
class Activity extends DataRepository {
  constructor(id, dataSet) {
    super(id, dataSet);
  }

  getStepsTaken(date, id) {
    return this.getGivenDayValue(date, 'numSteps');
    //add id as a parameter getGivenDayValue?
  }

  getMinutesActive(date) {
    return this.getGivenDayValue(date, 'minutesActive');
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

  getAvgActivityThruWeek(endDate) {
    return super.getWeeklyAverage(endDate, 'minutesActive')
  }

  getAvgStepsThruWeek(endDate) {
    return super.getWeeklyAverage(endDate, 'numSteps')
  }

  getAvgFlightsThruWeek(endDate) {
    return super.getWeeklyAverage(endDate, 'flightsOfStairs')
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

}
export default Activity 
