import UserRepository from './UserRepository';
import DataRepository from './DataRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import testUserData from '../test/test-data/test-users';
import testHydrationData from '..//test/test-data/test-hydration';
import testSleepData from '..//test/test-data/test-sleep';
import testActivityData from '..//test/test-data/test-activity';

let domUpdates = {

  greetUser(user) {
    // let user = new User(testUserData[0]);
    let headerName = document.getElementById('headerName');
    headerName.innerText = `${user.getFirstName()}'S `
  },

  displayUserDetails(user) {
    // let user = new User(testUserData[0]);
    let dropdownEmail = document.getElementById('dropdownEmail')
    let dropdownGoal = document.getElementById('dropdownGoal')
    let dropdownName = document.getElementById('dropdownName')

    dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`
    dropdownEmail.innerText = `EMAIL | ${user.email}`
    dropdownName.innerText = user.name.toUpperCase();
  },

  displayMainCards(user, hydration, activity, sleep) {
    let hydrationUserOuncesToday = document.getElementById('hydrationUserOuncesToday');
    let stepsUserStepsToday = document.getElementById('stepsUserStepsToday');
    let stairsUserStairsToday = document.getElementById('stairsUserStairsToday');
    let sleepUserHoursToday = document.getElementById('sleepUserHoursToday');

    let todayDate = "2019/06/22";
    let ozToday = hydration.getOzOnDate(todayDate, 'numOunces');
    let stepsToday = activity.getStepsTaken(todayDate, user.id);
    let stairsToday = activity.getFlightsClimbed(todayDate, user.id)
    let sleepToday = sleep.getHoursSleptOnDate(todayDate);
    hydrationUserOuncesToday.innerText = `${ozToday}`
    stepsUserStepsToday.innerText = `${stepsToday}`
    stairsUserStairsToday.innerText = `${stairsToday}`
    sleepUserHoursToday.innerText = `${sleepToday}`
  },

  // flipCard(cardToHide, cardToShow) {
  //   cardToHide.classList.add('hide');
  //   cardToShow.classList.remove('hide');
  // },

  displayHydrationCard(event, hydration, todayDate) {
    let hydrationMainCard = document.getElementById('hydrationMainCard');

    let hydrationInfo = event.target.closest('button').id
    hydrationMainCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="hydrationGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`
    if (hydrationInfo.includes('Calendar')) {
      let week = hydration.getWeekOfOz(todayDate, 'numOunces')
      let daysOunces = week.forEach(day => {
         return  hydrationMainCard.innerHTML += `${day.date} : ${day.numOunces}`
       })
    }
    if (hydrationInfo.includes('Info')) {
      let avg = hydration.getAllTimeAvgOz();
      return  hydrationMainCard.innerHTML += `Your average daily consumption is: ${avg} oz!`
    }
  },

  displayStepsCard(event, activity, todayDate) {
    let stepsMainCard = document.getElementById('stepsMainCard');
    let stepsInfo = event.target.closest('button').id
    stepsMainCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="hydrationGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`
    if (stepsInfo.includes('Calendar')) {
      let weekSteps = activity.getAvgStepsThruWeek(todayDate);
      let weekActiveMin = activity.getAvgActivityThruWeek(todayDate);
         return  stepsMainCard.innerHTML += `
         Your average daily steps this week was: ${weekSteps}
         Your average minutes active was: ${weekActiveMin}`
    }
    if (stepsInfo.includes('Info')) {
      let avgStepDay = activity.getAvgStepsOnDay();
      let avgMinDay = activity.getAvgMinutesOnDay();
      return  stepsMainCard.innerHTML += `
      Your average daily steps: ${avgStepDay}
      Your average daily active minutes: ${avgMinDay}
      `
    }
  },

  displayStairsCard(event, activity, todayDate) {
    let stairsMainCard = document.getElementById('stairsMainCard');
    let stairsInfo = event.target.closest('button').id
    stairsMainCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="hydrationGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`
    if (stairsInfo.includes('Calendar')) {
      let week = activity.getAvgFlightsThruWeek(todayDate);
         return  stairsMainCard.innerHTML += `
         Your average flights this week was: ${week}
         `
    }
    if (stairsInfo.includes('Info')) {
      let avgFlights = activity.getAvgFlightsOnDay();
      return  stairsMainCard.innerHTML += `
      Your average daily flights: ${avgFlights}
      `
    }
  },



}

// let stepsInfoCard = document.getElementById('stepsInfoCard');
// let stepsFriendsCard = document.getElementById('stepsFriendsCard');
// let stepsTrendingCard = document.getElementById('stepsTrendingCard');
// let stepsCalendarCard = document.getElementById('stepsCalendarCard');
// let stepsCalendarTotalActiveMinutesWeekly = document.getElementById('stepsCalendarTotalActiveMinutesWeekly');
// let stepsCalendarTotalStepsWeekly = document.getElementById('stepsCalendarTotalStepsWeekly');
// let stepsFriendAverageStepGoal = document.getElementById('stepsFriendAverageStepGoal');
// let stepsInfoActiveMinutesToday = document.getElementById('stepsInfoActiveMinutesToday');
// let stepsInfoMilesWalkedToday = document.getElementById('stepsInfo-miles-walkedToday');
// let stepsFriendActiveMinutesAverageToday = document.getElementById('stepsFriendActiveMinutesAverageToday');
// let stepsFriendStepsAverageToday = document.getElementById('stepsFriendStepsAverageToday');
// let stepsTrendingButton = document.getElementById('.steps-trendingButton');


export default domUpdates;
