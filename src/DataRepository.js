class DataRepository {
  constructor(id, dataSet) {
    this.userData = [];
    findUserData(id, dataSet);
  }

  findUserData(id, dataSet) {
    let matchingData = dataSet.filter(element => element.userID === id);
    this.userData = matchingData;
    // We might have to sort this by date?
  }

  getGivenDayValue(date, property) {
    let foundData = this.userData.find(element => element.date === date);
    return foundData[property];
  }

  getWeekValues(endDate, property) {
    let lastDayData = this.userData.find(element => element.date === endDate);
    let lastIndex = this.userData.indexOf(lastDayData);
    let start = lastIndex - 6;
    let end = lastIndex + 1;

    if (!userData[start]) {
      // If they choose a date that doesn't have previous data; ex. 2019/06/16
      return false
    } else {
      return this.userData.slice(start, end);
    }
  }
}

export default DataRepository;
