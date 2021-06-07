import DataRepository from './DataRepository';


class Hydration extends DataRepository {
  constructor(id, dataSet) {
    super(id, dataSet);
  }

  getAllTimeAvgOz() {
    let output = super.getAllTimeAvgDaily('numOunces');
    return Math.round(output);
  }

  getOzOnDate(date, property) {
    console.log(this)
    return super.getGivenDayValue(date, property);
  }

  getWeekOfOz(endDate, property) {
    return super.getWeekValues(endDate, property);
  }
}

export default Hydration;
