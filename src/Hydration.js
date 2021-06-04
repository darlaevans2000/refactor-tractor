// import DataRepository from './DataRepository';


class Hydration extends DataRepository {
  constructor(id, dataSet) {
    super(id, dataSet);
  }

  getAllTimeAvgOz(property) {
    let output = super.getAllTimeAvgDaily(property);
    return Math.round(output);
  }

  getOzOnDate(date, property) {
    return super.getGivenDayValue(date, property);
  }

  getWeekOfOz(endDate, property) {
    return super.getWeekValues(endDate, property);
  }
}

export default Hydration;
