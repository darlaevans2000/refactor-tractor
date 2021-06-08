import './css/base.scss';
import './css/styles.scss';

// import testUserData from '../test/test-data/test-users';
// import testHydrationData from '..//test/test-data/test-hydration';
// import testSleepData from '..//test/test-data/test-sleep';
// import testActivityData from '..//test/test-data/test-activity';

import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import domUpdates from './domUpdates';

/* GLOBAL VARIABLES*/
let user, hydration, activity, sleep, userRepository;

let todayDate = '2020/01/22'


/*QUERY SELECTORS*/
let hydrationMainCard = document.getElementById('hydrationMainCard');
let stepsMainCard = document.getElementById('stepsMainCard');
let stairsMainCard = document.getElementById('stairsMainCard');
let sleepMainCard = document.getElementById('sleepMainCard');
let main = document.getElementById('cardContainer');
let profileButton = document.getElementById('profileButton');

/*EVENT LISTENERS*/
window.addEventListener('load', loadPageInfo);

hydrationMainCard.addEventListener('click', function() {
  changeHydroCards(event);
})
stepsMainCard.addEventListener('click', function() {
  changeStepsCards(event);
})
stairsMainCard.addEventListener('click', function() {
  changeStairsCards(event);
})
sleepMainCard.addEventListener('click', function() {
  changeSleepCards(event);
})
main.addEventListener('click', function() {
  displayMain(event);
})
profileButton.addEventListener('click', displayProfile);

const fetchData = (param) => {
  return fetch(`http://localhost:3001/api/v1/${param}`)
    .then(response => response.json())
    .catch(err => console.error(err))
}

function loadPageInfo() {
  fetchData('users')
    .then(userData => {
      user = new User(userData.userData[0])
    })
    .then(() => domUpdates.greetUser(user))
    .then(() => setUpRepos())
}

const setUpRepos = () => {
  fetchData('hydration')
    .then(hydroData => {
      hydration = new Hydration(user.id, hydroData.hydrationData)
    });

  fetchData('sleep')
    .then(sleepData => {
      sleep = new Sleep(user.id, sleepData.sleepData)
    });

  fetchData('activity')
    .then(activityData => {
      activity = new Activity(user.id, activityData.activityData)
    })
    .then(() => domUpdates.displayMainCards(user, hydration, activity, sleep));
}

function displayProfile() {
  domUpdates.displayUserDetails(user)
}

function displayMain(event) {
  let property = event.target.closest('button').id
  console.log(property)
  if (property.includes('sleep')) {
    property = 'sleep'
  }
  if (property.includes('hydration')) {
    property = 'hydration'
  }
  if (property.includes('stairs')) {
    property = 'stairs'
  }
  if (property.includes('steps')) {
    property = 'steps'
  }
  domUpdates.changeCardsToMain(event, property);
}

function changeHydroCards(event) {
  let hydrationInfo = event.target.closest('button').id
  if (hydrationInfo.includes('Calendar')) {
    domUpdates.displayHydrationWeek(todayDate, hydration);
  }
   if (hydrationInfo.includes('Info')) {
    domUpdates.displayHydrationAvg(event, hydration)
  }
};

function changeStepsCards(event) {
  let stepsInfo = event.target.closest('button').id
  if (stepsInfo.includes('Calendar')) {
    domUpdates.displayStepsWeek(event, activity, todayDate);
  }
  if (stepsInfo.includes('Info')) {
  domUpdates.displayStepsAvg(event, activity);
  }
}

function changeStairsCards(event) {
  let stairsInfo = event.target.closest('button').id
  if (stairsInfo.includes('Calendar')) {
  domUpdates.displayStairsWeek(event, activity, todayDate);
}
  if (stairsInfo.includes('Info')) {
    domUpdates.displayStairsAvg(event, activity);
  }
};

function changeSleepCards(event) {
  let sleepInfo = event.target.closest('button').id
  if (sleepInfo.includes('Calendar')) {
    domUpdates.displaySleepWeek(event, sleep, todayDate);
  }
  if (sleepInfo.includes('Info')) {
    domUpdates.displaySleepAvg(event, sleep)
  }
};

// Form test

let sleepPostBtn = document.getElementById('sleepPost');
let sleepDate = document.getElementById('sleepDate');
let sleepHours = document.getElementById('sleepHours');
let sleepQuality = document.getElementById('sleepQuality');
let openSleepModal = document.getElementById('openSleepModal');
let closeModal = document.getElementById('closeModal');
let postModal = document.getElementById('postModal');
let successMsg = document.getElementById('successMsg');
let postData;

sleepPostBtn.addEventListener('click', function() {
  event.preventDefault();
  validateForm();
});
openSleepModal.addEventListener('click', function() {
  domUpdates.toggleHidden(postModal);
});
closeModal.addEventListener('click', function() {
  domUpdates.toggleHidden(postModal);
  clearForm();
})

let checkDate = (element) => {
  let dateFormat = /^\d{4}\/\d{2}\/\d{2}$/;

  if (element.value.match(dateFormat)) {
    return true;
  } else {
    return false;
  }
}

let checkNumber = element => {
  if (isNaN(element.value) || element.value === '') {
    return false;
  } else {
    return true;
  }
}

let validateForm = () => {
  let dateInput = checkDate(sleepDate);
  let hoursInput = checkNumber(sleepHours);
  let qualityInput = checkNumber(sleepQuality);

  clearErrors();

  if (!dateInput) {
    domUpdates.toggleHidden(document.getElementById('dateError'));
  }

  if(!hoursInput) {
    domUpdates.toggleHidden(document.getElementById('hourError'));
  }

  if(!qualityInput) {
    domUpdates.toggleHidden(document.getElementById('qualityError'));
  }

  if (dateInput && hoursInput && qualityInput) {
    assignData();
    clearErrors();
    console.log(postData);
    domUpdates.toggleHidden(successMsg);
    setTimeout(clearForm, 1000);
  }
};

let clearErrors = () => {
  document.getElementById('dateError').classList.add('hide');
  document.getElementById('hourError').classList.add('hide');
  document.getElementById('qualityError').classList.add('hide');
}

let clearForm = () => {
  sleepDate.value = '';
  sleepHours.value = '';
  sleepQuality.value = '';
  domUpdates.toggleHidden(successMsg);
}

let assignData = () => {
  postData =
    {
      'userID': user.id,
      'date': sleepDate.value,
      'hoursSlept': parseFloat(sleepHours.value),
      'sleepQuality': parseFloat(sleepQuality.value)
    };
};

// userData.forEach(user => {
//   user = new User(user);
//   userRepository.users.push(user)
// });
//
// activityData.forEach(activity => {
//   activity = new Activity(activity, userRepository);
// });
//
// hydrationData.forEach(hydration => {
//   hydration = new Hydration(hydration, userRepository);
// });
//
// sleepData.forEach(sleep => {
//   sleep = new Sleep(sleep, userRepository);
// });
//
// let user = userRepository.users[0];
// let todayDate = "2019/09/22";
// user.findFriendsNames(userRepository.users);
//
// let dailyOz = document.querySelectorAll('.daily-oz');
// let dropdownEmail = document.querySelector('#dropdown-email');
// let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
// let dropdownGoal = document.querySelector('#dropdown-goal');
// let dropdownName = document.querySelector('#dropdown-name');
// let headerName = document.querySelector('#header-name');
// let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
// let hydrationFriendOuncesToday = document.querySelector('#hydration-friend-ounces-today');
// let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
// let hydrationInfoCard = document.querySelector('#hydration-info-card');
// let hydrationInfoGlassesToday = document.querySelector('#hydration-info-glasses-today');
// let hydrationMainCard = document.querySelector('#hydration-main-card');
// let hydrationUserOuncesToday = document.querySelector('#hydration-user-ounces-today');
// let mainPage = document.querySelector('main');
// let profileButton = document.querySelector('#profile-button');
// let sleepCalendarCard = document.querySelector('#sleep-calendar-card');
// let sleepCalendarHoursAverageWeekly = document.querySelector('#sleep-calendar-hours-average-weekly');
// let sleepCalendarQualityAverageWeekly = document.querySelector('#sleep-calendar-quality-average-weekly');
// let sleepFriendLongestSleeper = document.querySelector('#sleep-friend-longest-sleeper');
// let sleepFriendsCard = document.querySelector('#sleep-friends-card');
// let sleepFriendWorstSleeper = document.querySelector('#sleep-friend-worst-sleeper');
// let sleepInfoCard = document.querySelector('#sleep-info-card');
// let sleepInfoHoursAverageAlltime = document.querySelector('#sleep-info-hours-average-alltime');
// let sleepInfoQualityAverageAlltime = document.querySelector('#sleep-info-quality-average-alltime');
// let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
// let sleepMainCard = document.querySelector('#sleep-main-card');
// let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');
// let sortedHydrationDataByDate = user.ouncesRecord.sort((a, b) => {
//   if (Object.keys(a)[0] > Object.keys(b)[0]) {
//     return -1;
//   }
//   if (Object.keys(a)[0] < Object.keys(b)[0]) {
//     return 1;
//   }
//   return 0;
// });
// let stairsCalendarCard = document.querySelector('#stairs-calendar-card');
// let stairsCalendarFlightsAverageWeekly = document.querySelector('#stairs-calendar-flights-average-weekly');
// let stairsCalendarStairsAverageWeekly = document.querySelector('#stairs-calendar-stairs-average-weekly');
// let stepsMainCard = document.querySelector('#steps-main-card');
// let stepsInfoCard = document.querySelector('#steps-info-card');
// let stepsFriendsCard = document.querySelector('#steps-friends-card');
// let stepsTrendingCard = document.querySelector('#steps-trending-card');
// let stepsCalendarCard = document.querySelector('#steps-calendar-card');
// let stairsFriendFlightsAverageToday = document.querySelector('#stairs-friend-flights-average-today');
// let stairsFriendsCard = document.querySelector('#stairs-friends-card');
// let stairsInfoCard = document.querySelector('#stairs-info-card');
// let stairsInfoFlightsToday = document.querySelector('#stairs-info-flights-today');
// let stairsMainCard = document.querySelector('#stairs-main-card');
// let stairsTrendingButton = document.querySelector('.stairs-trending-button');
// let stairsTrendingCard = document.querySelector('#stairs-trending-card');
// let stairsUserStairsToday = document.querySelector('#stairs-user-stairs-today');
// let stepsCalendarTotalActiveMinutesWeekly = document.querySelector('#steps-calendar-total-active-minutes-weekly');
// let stepsCalendarTotalStepsWeekly = document.querySelector('#steps-calendar-total-steps-weekly');
// let stepsFriendAverageStepGoal = document.querySelector('#steps-friend-average-step-goal');
// let stepsInfoActiveMinutesToday = document.querySelector('#steps-info-active-minutes-today');
// let stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
// let stepsFriendActiveMinutesAverageToday = document.querySelector('#steps-friend-active-minutes-average-today');
// let stepsFriendStepsAverageToday = document.querySelector('#steps-friend-steps-average-today');
// let stepsTrendingButton = document.querySelector('.steps-trending-button');
// let stepsUserStepsToday = document.querySelector('#steps-user-steps-today');
// let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
// let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
// let userInfoDropdown = document.querySelector('#user-info-dropdown');
//
// mainPage.addEventListener('click', showInfo);
// profileButton.addEventListener('click', showDropdown);
// stairsTrendingButton.addEventListener('click', updateTrendingStairsDays());
// stepsTrendingButton.addEventListener('click', updateTrendingStepDays());
//
// function flipCard(cardToHide, cardToShow) {
//   cardToHide.classList.add('hide');
//   cardToShow.classList.remove('hide');
// }
//
// function showDropdown() {
//   userInfoDropdown.classList.toggle('hide');
// }
//
// function showInfo() {
//   if (event.target.classList.contains('steps-info-button')) {
//     flipCard(stepsMainCard, stepsInfoCard);
//   }
//   if (event.target.classList.contains('steps-friends-button')) {
//     flipCard(stepsMainCard, stepsFriendsCard);
//   }
//   if (event.target.classList.contains('steps-trending-button')) {
//     flipCard(stepsMainCard, stepsTrendingCard);
//   }
//   if (event.target.classList.contains('steps-calendar-button')) {
//     flipCard(stepsMainCard, stepsCalendarCard);
//   }
//   if (event.target.classList.contains('hydration-info-button')) {
//     flipCard(hydrationMainCard, hydrationInfoCard);
//   }
//   if (event.target.classList.contains('hydration-friends-button')) {
//     flipCard(hydrationMainCard, hydrationFriendsCard);
//   }
//   if (event.target.classList.contains('hydration-calendar-button')) {
//     flipCard(hydrationMainCard, hydrationCalendarCard);
//   }
//   if (event.target.classList.contains('stairs-info-button')) {
//     flipCard(stairsMainCard, stairsInfoCard);
//   }
//   if (event.target.classList.contains('stairs-friends-button')) {
//     flipCard(stairsMainCard, stairsFriendsCard);
//   }
//   if (event.target.classList.contains('stairs-trending-button')) {
//     flipCard(stairsMainCard, stairsTrendingCard);
//   }
//   if (event.target.classList.contains('stairs-calendar-button')) {
//     flipCard(stairsMainCard, stairsCalendarCard);
//   }
//   if (event.target.classList.contains('sleep-info-button')) {
//     flipCard(sleepMainCard, sleepInfoCard);
//   }
//   if (event.target.classList.contains('sleep-friends-button')) {
//     flipCard(sleepMainCard, sleepFriendsCard);
//   }
//   if (event.target.classList.contains('sleep-calendar-button')) {
//     flipCard(sleepMainCard, sleepCalendarCard);
//   }
//   if (event.target.classList.contains('steps-go-back-button')) {
//     flipCard(event.target.parentNode, stepsMainCard);
//   }
//   if (event.target.classList.contains('hydration-go-back-button')) {
//     flipCard(event.target.parentNode, hydrationMainCard);
//   }
//   if (event.target.classList.contains('stairs-go-back-button')) {
//     flipCard(event.target.parentNode, stairsMainCard);
//   }
//   if (event.target.classList.contains('sleep-go-back-button')) {
//     flipCard(event.target.parentNode, sleepMainCard);
//   }
// }
//
// function updateTrendingStairsDays() {
//   user.findTrendingStairsDays();
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
// }
//
// function updateTrendingStepDays() {
//   user.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
// }
//
// for (var i = 0; i < dailyOz.length; i++) {
//   dailyOz[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
// }
//
// dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`;
//
// dropdownEmail.innerText = `EMAIL | ${user.email}`;
//
// dropdownName.innerText = user.name.toUpperCase();
//
// headerName.innerText = `${user.getFirstName()}'S `;
//
// hydrationUserOuncesToday.innerText = hydrationData.find(hydration => {
//   return hydration.userID === user.id && hydration.date === todayDate;
// }).numOunces;
//
// hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);
//
// hydrationInfoGlassesToday.innerText = hydrationData.find(hydration => {
//   return hydration.userID === user.id && hydration.date === todayDate;
// }).numOunces / 8;
//
// sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageHoursThisWeek(todayDate);
//
// sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageQualityThisWeek(todayDate);
//
// sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
//   return user.id === userRepository.getLongestSleepers(todayDate)
// }).getFirstName();
//
// sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
//   return user.id === userRepository.getWorstSleepers(todayDate)
// }).getFirstName();
//
// sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;
//
// stepsInfoMilesWalkedToday.innerText = user.activityRecord.find(activity => {
//   return (activity.date === todayDate && activity.userId === user.id)
// }).calculateMiles(userRepository);
//
// sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;
//
// sleepInfoQualityToday.innerText = sleepData.find(sleep => {
//   return sleep.userID === user.id && sleep.date === todayDate;
// }).sleepQuality;
//
// sleepUserHoursToday.innerText = sleepData.find(sleep => {
//   return sleep.userID === user.id && sleep.date === todayDate;
// }).hoursSlept;
//
// stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);
//
// stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
//
// stairsFriendFlightsAverageToday.innerText = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);
//
// stairsInfoFlightsToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).flightsOfStairs;
//
// stairsUserStairsToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).flightsOfStairs * 12;
//
// stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);
//
// stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
//
// stairsTrendingButton.addEventListener('click', function () {
//   user.findTrendingStairsDays();
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
// });
//
// stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateAverageMinutesActiveThisWeek(todayDate);
//
// stepsCalendarTotalStepsWeekly.innerText = user.calculateAverageStepsThisWeek(todayDate);
//
// stepsTrendingButton.addEventListener('click', function () {
//   user.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
// });
//
// stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverageMinutesActive(todayDate);
//
// stepsFriendAverageStepGoal.innerText = `${userRepository.calculateAverageStepGoal()}`;
//
// stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageSteps(todayDate);
//
// stepsInfoActiveMinutesToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).minutesActive;
//
// stepsUserStepsToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).numSteps;
//
// user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);
//
// user.friendsActivityRecords.forEach(friend => {
//   dropdownFriendsStepsContainer.innerHTML += `
//   <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
//   `;
// });
//
// let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');
//
// friendsStepsParagraphs.forEach(paragraph => {
//   if (friendsStepsParagraphs[0] === paragraph) {
//     paragraph.classList.add('green-text');
//   }
//   if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
//     paragraph.classList.add('red-text');
//   }
//   if (paragraph.innerText.includes('YOU')) {
//     paragraph.classList.add('yellow-text');
//   }
// });