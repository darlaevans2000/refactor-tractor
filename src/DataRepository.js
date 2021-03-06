class DataRepository {
  constructor(id, dataSet) {
    this.userData = [];
    this.dataSet = dataSet;
    this.findUserData(id, dataSet);
  }


  findUserData(id) {
    let matchingData = this.dataSet.filter(element => element.userID === id);
    return this.userData = matchingData;
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

    if (start < 0) {
      return false;
    } else {
      return this.userData.slice(start, end);
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
    let sortedData = dataSet.sort((a,b) => b[property] - a[property]);
    return sortedData[0][property];
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