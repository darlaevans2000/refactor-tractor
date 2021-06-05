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

  greetUser() {
    let user = new User(testUserData[0]);
    let headerName = document.getElementById('headerName');
    headerName.innerText = `${user.getFirstName()}'S `
  },

  displayUserDetails() {
    let user = new User(testUserData[0]);
    let dropdownEmail = document.getElementById('dropdownEmail')
    let dropdownGoal = document.getElementById('dropdownGoal')
    let dropdownName = document.getElementById('dropdownName')

    dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`
    dropdownEmail.innerText = `EMAIL | ${user.email}`
    dropdownName.innerText = user.name.toUpperCase();
  },

  displayMainCards() {
    let user = new User(testUserData[0]);
    let hydration = new Hydration(user.id, testHydrationData);
    let activity = new Activity(user.id, testActivityData);
    let sleep = new Sleep(user.id, testSleepData);

    let hydrationUserOuncesToday = document.getElementById('hydrationUserOuncesToday');
    let stepsUserStepsToday = document.getElementById('stepsUserStepsToday');
    let stairsUserStairsToday = document.getElementById('stairsUserStairsToday');
    let sleepUserHoursToday = document.getElementById('sleepUserHoursToday');

    let todayDate = "2019/06/22";
    let ozToday = hydration.getOzOnDate(todayDate, 'numOunces');
    console.log('working')
    let stepsToday = activity.getStepsTaken(todayDate, user.id);
    let stairsToday = activity.getFlightsClimbed(todayDate, user.id)
    let sleepToday = sleep.getHoursSleptOnDate(todayDate);
    hydrationUserOuncesToday.innerText = `${ozToday}`
    stepsUserStepsToday.innerText = `${stepsToday}`
    stairsUserStairsToday.innerText = `${stairsToday}`
    sleepUserHoursToday.innerText = `${sleepToday}`
  },

  flipCard(cardToHide, cardToShow) {
    cardToHide.classList.add('hide');
    cardToShow.classList.remove('hide');
  },

  displayHydrationCard() {
    let hydrationMainCard = document.getElementById('hydrationMainCard');
    let hydrationInfo = event.target.id
    if (hydrationInfo === hydrationInfo) {
       this.flipCard(hydrationMainCard, hydrationInfo)
    }

    // let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
    // let hydrationFriendOuncesToday = document.querySelector('#hydration-friend-ounces-today');
    // let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
    // let hydrationInfoCard = document.querySelector('#hydration-info-card');
    // let hydrationInfoGlassesToday = document.querySelector('#hydration-info-glasses-today');
    // let hydrationMainCard = document.querySelector('#hydration-main-card');
    // let hydrationU serOuncesToday = document.querySelector('#hydration-user-ounces-today');

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
