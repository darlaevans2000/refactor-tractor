import sleepData from './data/sleep';

class UserRepository {
  constructor(userData) {
    this.users = [];
  }
  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  calculateAverageStepGoal() {
    let goals = this.users.map(user => user.dailyStepGoal);
    let total = goals.reduce((sum, goal) => {
      sum += goal;
      return sum;
    }, 0);
    return total / this.users.length;
  }

// User no longer has sleepQualityAverage property
  // calculateAverageSleepQuality() {
  //   let totalSleepQuality = this.users.reduce((sum, user) => {
  //     sum += user.sleepQualityAverage;
  //     return sum;
  //   }, 0);
  //   return totalSleepQuality / this.users.length;
  // }

  calculateAverageSleepQuality(sleepData) {
    let sumQuality = sleepData.reduce((sum, currentValue) => sum += currentValue.sleepQuality, 0);
    return parseFloat((sumQuality / sleepData.length).toFixed(1));
  }

  // calculateAverageActivity(date, task) {
  //   let count = this.users.map(user => {
  //     return user.activityRecord.filter(activity => activity.date === date)
  //   });
  //
  //   let sum = count.reduce((total, activityList) => {
  //     activityList.forEach(activity => {
  //       total += activity[task];
  //     });
  //     return total;
  //   }, 0);
  //
  //   return Math.round(sum / count.length);
  // }
  // use for average steps, stairs, and minutes active
  calculateAverageActivity(dataSet, date, task) {
    let matchedDates = dataSet.filter(element => element.date === date);

    let taskValues = matchedDates.map(element => element[task]);

    let sum = taskValues.reduce((total, currentValue) => total += currentValue, 0);

    return Math.round(sum / taskValues.length);
  }

// *** Activity record is now a part of activity class not user class

// This isn't in the spec anywhere?
  // calculateAverageDailyWater(date) {
  //   let todaysDrinkers = this.users.filter(user => user.addDailyOunces(date) > 0);
  //   let sumDrankOnDate = todaysDrinkers.reduce((sum, drinker) => {
  //     return sum += drinker.addDailyOunces(date);
  //   }, 0)
  //   return Math.floor(sumDrankOnDate / todaysDrinkers.length);
  // }

  findBestSleepers(date) {
    return this.users.filter(user => user.calculateAverageQualityThisWeek(date) > 3);
  }

  // getLongestSleepers(date, sleepData) {
  //   sleepData.filter(sleep => sleep.date === date).sort((a, b) => {
  //     return b.hoursSlept - a.hoursSlept;
  //   })[0].userID;
  // }
  getLongestSleepers(date, sleepData) {
    let dateMatch = sleepData.filter(sleep => sleep.date === date);
    let sortedMatches = dateMatch.sort((a, b) => b.hoursSlept - a.hoursSlept);

    return sortedMatches[0].userID;
  }

  getWorstSleepers(date) {
    sleepData.filter(sleep => sleep.date === date).sort((a, b) => {
      return a.hoursSlept - b.hoursSlept;
    })[0].userID;
  }
}

export default UserRepository;
