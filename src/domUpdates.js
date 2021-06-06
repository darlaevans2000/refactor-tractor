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

  displayHydrationCard(event, hydration) {
    let hydrationMainCard = document.getElementById('hydrationMainCard');
    let todayDate = "2019/06/22";

    let hydrationInfo = event.target.closest('button').id
    hydrationMainCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="hydrationGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`
    if (hydrationInfo.includes('Calendar')) {
      let week = hydration.getWeekOfOz(todayDate, 'numOunces')
      let daysOunces = week.forEach(day => {
         return  hydrationMainCard.innerHTML += `${day.date} : ${day.numOunces}`
       })
    }
    // hydrationUserOuncesToday.innerText = hydrationData.find(hydration => {
    //   return hydration.userID === user.id && hydration.date === todayDate;
    // }).numOunces;
    //
    // hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);
    //
    // hydrationInfoGlassesToday.innerText = hydrationData.find(hydration => {
    //   return hydration.userID === user.id && hydration.date === todayDate;
    // }).numOunces / 8;

  },

  displayStepsCard() {
    let stepsMainCard = document.getElementById('stepsMainCard');
    let stepsInfoCard = document.getElementById('stepsInfoCard');
    let stepsFriendsCard = document.getElementById('stepsFriendsCard');
    let stepsTrendingCard = document.getElementById('stepsTrendingCard');
    let stepsCalendarCard = document.getElementById('stepsCalendarCard');
    let stepsCalendarTotalActiveMinutesWeekly = document.getElementById('stepsCalendarTotalActiveMinutesWeekly');
    let stepsCalendarTotalStepsWeekly = document.getElementById('stepsCalendarTotalStepsWeekly');
    let stepsFriendAverageStepGoal = document.getElementById('stepsFriendAverageStepGoal');
    let stepsInfoActiveMinutesToday = document.getElementById('stepsInfoActiveMinutesToday');
    let stepsInfoMilesWalkedToday = document.getElementById('stepsInfo-miles-walkedToday');
    let stepsFriendActiveMinutesAverageToday = document.getElementById('stepsFriendActiveMinutesAverageToday');
    let stepsFriendStepsAverageToday = document.getElementById('stepsFriendStepsAverageToday');
    let stepsTrendingButton = document.getElementById('.steps-trendingButton');

  },

  displayStairsCard() {
    let stairsCalendarCard = document.getElementById('stairsCalendarCard');
    let stairsCalendarFlightsAverageWeekly = document.getElementById('stairsCalendarFlightsAverageWeekly');
    let stairsCalendarStairsAverageWeekly = document.getElementById('stairsCalendarStairsAverageWeekly');
    let stairsFriendFlightsAverageToday = document.getElementById('stairsFriendFlightsAverageToday');
    let stairsFriendsCard = document.getElementById('stairsFriendsCard');
    let stairsInfoCard = document.getElementById('stairsInfoCard');
    let stairsInfoFlightsToday = document.getElementById('stairsInfoFlightsToday');
    let stairsMainCard = document.getElementById('stairsMainCard');
    let stairsTrendingButton = document.getElementByClass('stairsTrendingButton');
    let stairsTrendingCard = document.getElementById('stairs-trendingCard');
  },

  displaySleepCard() {
    let sleepCalendarCard = document.querySelector('#sleepCalendarCard');
    let sleepCalendarHoursAverageWeekly = document.querySelector('#sleepCalendarHoursAverageWeekly');
    let sleepCalendarQualityAverageWeekly = document.querySelector('#sleepCalendarQualityAverageWeekly');
    let sleepFriendLongestSleeper = document.querySelector('#sleepFriendLongestSleeper');
    let sleepFriendsCard = document.querySelector('#sleepFriendsCard');
    let sleepFriendWorstSleeper = document.querySelector('#sleepFriendWorstSleeper');
    let sleepInfoCard = document.querySelector('#sleepInfoCard');
    let sleepInfoHoursAverageAlltime = document.querySelector('#sleepInfoHoursAverageAlltime');
    let sleepInfoQualityAverageAlltime = document.querySelector('#sleepInfoQualityAverageAlltime');
    let sleepInfoQualityToday = document.querySelector('#sleepInfoQualityToday');
    let sleepMainCard = document.querySelector('#sleepMainCard');
    let sleepUserHoursToday = document.querySelector('#sleepUserHoursToday');

  },

}

export default domUpdates;
