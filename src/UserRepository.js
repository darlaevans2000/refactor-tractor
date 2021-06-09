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

  calculateAverageSleepQuality(sleepData) {
    let sumQuality = sleepData.reduce((sum, currentValue) => sum += currentValue.sleepQuality, 0);
    return parseFloat((sumQuality / sleepData.length).toFixed(1));
  }

  calculateAverageActivity(dataSet, date, task) {
    let matchedDates = dataSet.filter(element => element.date === date);

    let taskValues = matchedDates.map(element => element[task]);

    let sum = taskValues.reduce((total, currentValue) => total += currentValue, 0);

    return Math.round(sum / taskValues.length);
  }

  getLongestSleepers(date, sleepData) {
    let dateMatch = sleepData.filter(sleep => sleep.date === date);
    let sortedMatches = dateMatch.sort((a, b) => b.hoursSlept - a.hoursSlept);

    return sortedMatches[0].userID;
  }

}

export default UserRepository;
