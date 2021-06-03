class Hydration extends DataRepository {
  constructor(id, dataSet) {
    super(id, dataSet);
  }

  // Calculate average ounces per day for all time
  getAllTimeAvgOz(property) {
    super.getAllTimeAvgDaily(property);
  }

  // Find how many ounces consumed on a specific day
  getOzOnDate(date, property) {
    super.getGivenDayValue(date, property);
  }

  // Find how many ounces consumed on each day of a given week

}

export default Hydration;
