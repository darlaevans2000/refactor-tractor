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

  getHoursSleptForWeek(endDate) {
    return super.getWeekValues(endDate, 'hoursSlept');
  }

  getSleepQualityForWeek(endDate) {
    return super.getWeekValues(endDate, 'sleepQuality');
  }
}

export default Sleep;
