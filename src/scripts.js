import './css/base.scss';
import './css/styles.scss';

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


// New Data POST form

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

  domUpdates.clearErrors();

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
    domUpdates.clearErrors();
    postNewData();
  }
};

let clearForm = () => {
  sleepDate.value = '';
  sleepHours.value = '';
  sleepQuality.value = '';
  successMsg.classList.add('hide');
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

let makePostRequest = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  })
}

let postNewData = () => {
  assignData();
  domUpdates.clearErrors();
  makePostRequest('sleep')
    .then(response => {
      if (response.ok) {
        successMsg.classList.remove('hide');
        setTimeout(clearForm, 1500);
        return response.json();
      } else {
        throw new Error('Unable to post data, please try again')
      }
    })
}
