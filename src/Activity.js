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
  }

  getFlightsClimbed(date, id) {
    return this.getGivenDayValue(date, id, 'flightsOfStairs');
  }

  getMilesWalked(date, user) {
    let steps = this.getStepsTaken(date, user.id)
    let strideLength = user.strideLength;
    return (steps === null ? null : steps * strideLength / 5280);
  };

}