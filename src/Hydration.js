class Hydration {
  constructor(data, userRepository) {
    this.userId = data.userID;
    this.date = data.date;
    this.ounces = data.numOunces;
    this.data = data;
    // this.ouncesAverage = 0;  - hydration
    // this.ouncesRecord = []; - hydration

    this.drink(userRepository);
  }
  // Calculate average ounces per day for all time
  calcDailyAvgOz(id) {
    let totalDays = 0;

    let totalOz = this.data.reduce((sum, dayData) => {
      if (dayData.userID === id) {
        totalDays += 1;
        sum += dayData.numOunces;
      }
      return sum;
    }, 0);

    return Math.floor(totalOz / totalDays);
  }

  // Find how many ounces consumed on a specific day

  // Find how many ounces consumed on each day of a given week

  // drink(userRepo) {
  //   var hydrate = this;
  //   userRepo.users.find(function(user) {
  //     return user.id === hydrate.userId;
  //   }).updateHydration(this.date, this.ounces);
  // }

  // updateHydration(date, amount) {
  //   this.ouncesRecord.unshift({[date]: amount});
  //   if (this.ouncesRecord.length) {
  //     this.ouncesAverage = Math.round((amount + (this.ouncesAverage * (this.ouncesRecord.length - 1))) / this.ouncesRecord.length);
  //   } else {
  //     this.ouncesAverage = amount;
  //   }
  // }

  // Average Oz?
  // addDailyOunces(date) {
  //   return this.ouncesRecord.reduce((sum, record) => {
  //     let amount = record[date];
  //     if (amount) {
  //       sum += amount
  //     }
  //     return sum
  //   }, 0)
  // }
}

export default Hydration;
