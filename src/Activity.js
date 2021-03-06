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

  getAvgStepsOnDay() {
    return super.getAllTimeAvgDaily('numSteps');
  };

  getAvgMinutesOnDay() {
    return super.getAllTimeAvgDaily('minutesActive');;
  }

  getAvgFlightsOnDay() {
    return this.getAllTimeAvgDaily('flightsOfStairs');
  }

  achievedGoal(user, date) {
    if (user === undefined || date === undefined || user.id !== date.userID) return null;
    return date.numSteps > user.dailyStepGoal;
  };

  getDaysExceededGoal(user) {
    let daysExceeded = this.dataSet.filter((date) => {
      return this.achievedGoal(user, date)
    })
    return daysExceeded || [];
  };


  getStairRecord(user) {
    const userData = super.findUserData(user.id, 'flightsOfStairs');
    if (userData.length === 0) {
      return null;
    }
    return super.findUserData(user.id, 'flightsOfStairs').reduce((a, b) => {
      return (b.userID === user.id ? Math.max(a, b.flightsOfStairs) : a);
    }, 0);
  };

  getMinActiveRecord(user) {
    const userData = super.findUserData(user.id, 'minutesActive');
    if (userData.length === 0) {
      return null;
    }
    return super.findUserData(user.id, 'minutesActive').reduce((a, b) => {
      return (b.userID === user.id ? Math.max(a, b.minutesActive) : a);
    }, 0);
  };

  getStepsRecord(user) {
    const userData = super.findUserData(user.id, 'numSteps');
    if (userData.length === 0) {
      return null;
    }
    return super.findUserData(user.id, 'numSteps').reduce((a, b) => {
      return (b.userID === user.id ? Math.max(a, b.numSteps) : a);
    }, 0);
  };

  getMonthlyActivityChampion(beginDate, endDate) {
    const result = this.dataSet.reduce((record, current) => {
      let check = record.record;
      let test = ((beginDate, endDate) ? Math.max(record.record, current.minutesActive) : record.record);
      return (check === test ? record : {
        userID: current.userID,
        record: current.minutesActive
      });
    }, {
      userID: null,
      record: 0
    });
    return result;
  }

}

export default Activity;
