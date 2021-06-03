class Hydration extends DataRepository {
  constructor(id, dataSet) {
    super(id, dataSet);
  }

  getAllTimeAvgOz(property) {
    return super.getAllTimeAvgDaily(property);
  }

  getOzOnDate(date, property) {
    return super.getGivenDayValue(date, property);
  }

  getWeekOfOz(endDate, property) {
    return super.getWeekValues(endDate, property);
  }
}

export default Hydration;
