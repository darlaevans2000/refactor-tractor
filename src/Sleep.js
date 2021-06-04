class Sleep extends DataRepository {
  constructor(id, dataSet) {
    super(id, dataSet);
  }

  getAvgHoursSleptPerDay() {
    return super.getAllTimeAvgDaily('hoursSlept');
  }

  getAllTimeAvgSleepQuality() {
    return super.getAllTimeAvgDaily('sleepQuality');
  }

  // calculateAverageHoursThisWeek() {

  // }

  // calculateAverageQualityThisWeek(todayDate) {

  // }
}

export default Sleep;
