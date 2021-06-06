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
    let headerName = document.getElementById('headerName');
    headerName.innerText = `${user.getFirstName()}'S `
  },

  // displayUserDetails(user) {
  //   let dropdownEmail = document.getElementById('dropdownEmail')
  //   let dropdownGoal = document.getElementById('dropdownGoal')
  //   let dropdownName = document.getElementById('dropdownName')
  //
  //   dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`
  //   dropdownEmail.innerText = `EMAIL | ${user.email}`
  //   dropdownName.innerText = user.name.toUpperCase();
  // },

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

  displayHydrationWeek(event, hydration, todayDate) {
    let hydrationMainCard = document.getElementById('hydrationMainCard');

    hydrationMainCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="hydrationGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`
    let week = hydration.getWeekOfOz(todayDate, 'numOunces')
    let daysOunces = week.forEach(day => {
        return  hydrationMainCard.innerHTML += `${day.date} : ${day.numOunces}`
      });
    },

  displayHydrationAvg(event, hydration) {
    let hydrationMainCard = document.getElementById('hydrationMainCard');
    hydrationMainCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="hydrationGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`

    let avg = hydration.getAllTimeAvgOz();
    return  hydrationMainCard.innerHTML += `Your average daily consumption is: ${avg} oz!`
  },

  displayStepsWeek(event, activity, todayDate) {
    let stepsMainCard = document.getElementById('stepsMainCard');

    stepsMainCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="hydrationGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`
    let weekSteps = activity.getAvgStepsThruWeek(todayDate);
    let weekActiveMin = activity.getAvgActivityThruWeek(todayDate);
       return  stepsMainCard.innerHTML += `
       Your average daily steps this week was: ${weekSteps}
       Your average minutes active was: ${weekActiveMin}`
    },

  displayStepsAvg(event, activity) {
    let stepsMainCard = document.getElementById('stepsMainCard');

    stepsMainCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="hydrationGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`
    let avgStepDay = activity.getAvgStepsOnDay();
    let avgMinDay = activity.getAvgMinutesOnDay();
    return  stepsMainCard.innerHTML += `
    Your average daily steps: ${avgStepDay}
    Your average daily active minutes: ${avgMinDay}
    `
  },

  displayStairsCard(event, activity, todayDate) {
    let stairsMainCard = document.getElementById('stairsMainCard');
    stairsMainCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="hydrationGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`
    let week = activity.getAvgFlightsThruWeek(todayDate);
    return  stairsMainCard.innerHTML += `
    Your average flights this week was: ${week}
    `
  },

  displayStairsAvg(event, activity) {
    let stairsMainCard = document.getElementById('stairsMainCard');
    stairsMainCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="hydrationGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`

    let avgFlights = activity.getAvgFlightsOnDay();
    return  stairsMainCard.innerHTML += `
    Your average daily flights: ${avgFlights}
    `
  },

  displaySleepWeek(event, sleep, todayDate) {
    let sleepMainCard = document.querySelector('#sleepMainCard');
    let week = sleep.getWeekOfSleepData(todayDate)
    let avgWeekHr = sleep.calculateAverageHoursThisWeek(todayDate)
    let avgWeekQual = sleep.calculateAverageQualityThisWeek(todayDate)
    sleepMainCard.innerHTML = `
    <button type="button" name="button" class="go-back-button" id="hydrationGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>
    Average hours slept: ${avgWeekHr}
    Average quality this week: ${avgWeekQual}
    `
    let dailyHours = week.forEach(day => {
      return  sleepMainCard.innerHTML += `${day.date} : ${day.hoursSlept}`
    })
  },

  displaySleepAvg(event, sleep) {
    let sleepMainCard = document.querySelector('#sleepMainCard');
    sleepMainCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="hydrationGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`

    let avgHours = sleep.getAvgHoursSleptPerDay();
    let avgQuality = sleep.getAllTimeAvgSleepQuality();

    return  sleepMainCard.innerHTML += `
    Average daily hours of sleep: ${avgHours}
    Average daily quality of sleep: ${avgQuality}
    `
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
