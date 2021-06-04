class DataRepository {
  constructor(id, dataSet) {
    this.userData = [];
    this.findUserData(id, dataSet);
  }

  findUserData(id, dataSet) {
    let matchingData = dataSet.filter(element => element.userID === id);
    this.userData = matchingData;
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

<<<<<<< HEAD
    if (start < 0) {
      return false
    } else {
      return this.userData.slice(start, end);
=======
    if (!this.userData[start]) {
      // If they choose a date that doesn't have previous data; ex. 2019/06/16
      return false
    } else {
      // This is an array of data objects
      let weekValues = this.userData.slice(start, end);
      return weekValues;
>>>>>>> main
    }
  }

  getAllTimeAvgDaily(property) {
    let numDays = this.userData.length;
    let sum = this.userData.reduce((total, element) => {
      total += element[property];
      return total;
    }, 0);

    return Number.parseFloat((sum / numDays).toFixed(1));
  }

  getHighestValue(dataSet, property) {
    this.dataSet.sort((a,b) => {
      return b[property] - a[property]
    })[0][property]
  }

  getWeeklyAverage(endDate, property) {
    let values = this.getWeekValues(endDate, property);

    if (!values) {
      return false;
    } else {
      let sum = values.reduce((total, currentVal) => {
        total += currentVal[property];
        return total;
      }, 0);

      return Number.parseFloat((sum / values.length).toFixed(1));
    }
  }
}

export default DataRepository;
