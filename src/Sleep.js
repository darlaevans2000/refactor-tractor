import DataRepository from './DataRepository';

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

  getWeekOfSleepData(endDate) {
    return super.getWeekValues(endDate);
  }

  calculateAverageHoursThisWeek(endDate) {
    return super.getWeeklyAverage(endDate, 'hoursSlept');
  }

  calculateAverageQualityThisWeek(endDate) {
    return super.getWeeklyAverage(endDate, 'sleepQuality');
  }

  getHoursSleptOnDate(date) {
    return super.getGivenDayValue(date, 'hoursSlept');
  }

  getSleepQualityOnDate(date) {
    return super.getGivenDayValue(date, 'sleepQuality');
  }
}

export default Sleep;
