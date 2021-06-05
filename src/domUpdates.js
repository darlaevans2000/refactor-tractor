let domUpdates = {
  let infoButton =
  greetUser(currentUser) {
    let headerName = document.getElementById('header-name');
    headerName.innerText = `${user.getFirstName()}'S `;
  };

  displayUserDetails(currentUser) {
    let dropdownEmail = document.getElementById('dropdown-email');
    let dropdownGoal = document.getElementById('dropdownGoal');
    let dropdownName = document.getElementById('dropdown-name');

    dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`;
    dropdownEmail.innerText = `EMAIL | ${user.email}`;
    dropdownName.innerText = user.name.toUpperCase();
  };

  displayMainCards(currentUser) {
    let hydrationMainCard = document.getElementById('hydrationMainCard');
    let stepsUserStepsToday = document.getElementById('stepsUserStepsToday');
    let stairsUserStairsToday = document.getElementById('stairsUser-stairsToday');
    let sleepUserHoursToday = document.getElementById('sleepUserHoursToday');

    let todayDate = "2019/09/22";
    let ozToday = hydration.getOzOnDate(todayDate, 'numOunces');
    let stepsToday = activity.getStepsTaken(todayDate, currentUser.id);
    let stairsToday = activity.getFlightsClimbed(todayDate, currentUser.id)
    let sleepToday = sleep.getHoursSleptOnDate(todayDate);
    hydrationMainCard.innerText = `${ozToday}`;
    stepsUserStepsToday.innerText = `${stepsToday}`;
    stepsUserStairsToday.innerText = `${stairsToday}`;
    sleepUserHoursToday.innerText = `${sleepToday}`;

  }
  displayHydrationCard() {
  }
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

  }

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
  }

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

  }

}

export default domUpdates;
