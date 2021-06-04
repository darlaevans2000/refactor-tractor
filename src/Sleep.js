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

  calculateAverageHoursThisWeek(endDate) {
    return super.getWeeklyAverage(endDate, 'hoursSlept');
  }

  calculateAverageQualityThisWeek(endDate) {
    return super.getWeeklyAverage(endDate, 'sleepQuality');
  }
}

export default Sleep;
