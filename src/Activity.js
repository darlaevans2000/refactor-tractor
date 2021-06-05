import DataRepository from './DataRepository';
class Activity extends DataRepository {
  constructor(id, dataSet) {
    super(id, dataSet);
  }

  getStepsTaken(date) {
    return this.getGivenDayValue(date, 'numSteps');
  }

  getMinutesActive(date) {
    return this.getGivenDayValue(date, 'minutesActive');
  }

  getFlightsClimbed(date) {
    return this.getGivenDayValue(date, 'flightsOfStairs');
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

  getAvgStepsOnDay () {
    return super.getAllTimeAvgDaily('numSteps');
  };

  getAvgMinutesOnDay() {
    return super.getAllTimeAvgDaily('minutesActive');;
  }

  // getAvgFlightsOnDay(date) {
  //   return this.getAvgDaily('flightsOfStairs', date);
  // }

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


}
export default Activity 
