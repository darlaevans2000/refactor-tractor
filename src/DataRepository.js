class DataRepository {
  constructor(id, dataSet) {
    this.userData = [];
    findUserData(id, dataSet);
  }

  findUserData(id, dataSet) {
    let matchingData = dataSet.filter(element => element.userID === id);
    this.userData = matchingData;
  }
}

export default Hydration;
