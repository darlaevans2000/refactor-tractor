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

  displayUserDetails(user) {
    console.log('working')

    let userInfoDropdown = document.getElementById('userInfoDropdown')
    userInfoDropdown.classList.toggle('hide');

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

    let todayDate = "2020/01/22";
    let ozToday = hydration.getOzOnDate(todayDate, 'numOunces');
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

  changeCardsToMain(event, property) {
    let main = document.getElementById(`${property}MainCard`)
    console.log(main)
    let button = event.target.closest('button').id
    if (button.includes('GoBack')) {
      this.flipCard(event.target.closest('button').parentNode, main)
      }
    },

  displayHydrationWeek(todayDate, hydration) {
    let hydrationMainCard = document.getElementById('hydrationMainCard');
    let hydrationCalendarCard = document.getElementById('hydrationCalendarCard');
      this.flipCard(hydrationMainCard, hydrationCalendarCard);

    hydrationCalendarCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="hydrationGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`
    let hydrationDay = document.getElementById('hydrationDay');
    let hydrationCalendarOunces = document.getElementById('hydrationCalendarOunces');
    let week = hydration.getWeekOfOz(todayDate, 'numOunces')
    let date = week.forEach(day => {
         return  hydrationCalendarCard.innerHTML += `<p class="calendar-text">${day.date}: ${day.numOunces}</p>`
       });
  },

  displayHydrationAvg(event, hydration) {
    let hydrationMainCard = document.getElementById('hydrationMainCard');
    let hydrationInfoCard = document.getElementById('hydrationInfoCard');
    this.flipCard(hydrationMainCard, hydrationInfoCard )
    hydrationInfoCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="hydrationGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`

    let avg = hydration.getAllTimeAvgOz();
    return  hydrationInfoCard.innerHTML += `<p class="info-text">Your average daily consumption is: ${avg} oz!</p>`
  },

  displayStepsWeek(event, activity, todayDate) {
    let stepsMainCard = document.getElementById('stepsMainCard');
    let stepsCalendarCard = document.getElementById('stepsCalendarCard');
    this.flipCard(stepsMainCard, stepsCalendarCard)

    stepsCalendarCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="stepsGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`
    let weekSteps = activity.getAvgStepsThruWeek(todayDate);
    let weekActiveMin = activity.getAvgActivityThruWeek(todayDate);
       return  stepsCalendarCard.innerHTML += `
      <p class="info-text">Average daily steps this week was: ${weekSteps}</p>
      <p class="info-text">Average minutes active was: ${weekActiveMin}</p>`
    },

  displayStepsAvg(event, activity) {
    let stepsMainCard = document.getElementById('stepsMainCard');
    let stepsInfoCard = document.getElementById('stepsInfoCard');
    this.flipCard(stepsMainCard, stepsInfoCard)


    stepsInfoCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="stepsGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`
    let avgStepDay = activity.getAvgStepsOnDay();
    let avgMinDay = activity.getAvgMinutesOnDay();
    return  stepsInfoCard.innerHTML += `
      <p class="info-text">Average daily steps: ${avgStepDay}</p>
      <p class="info-text">Average daily active minutes: ${avgMinDay}</p>
    `
  },

  displayStairsWeek(event, activity, todayDate) {
    let stairsMainCard = document.getElementById('stairsMainCard');
    let stairsCalendarCard = document.getElementById('stairsCalendarCard');
    this.flipCard(stairsMainCard, stairsCalendarCard)

    stairsCalendarCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="stairsGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`
    let week = activity.getAvgFlightsThruWeek(todayDate);
    return  stairsCalendarCard.innerHTML += `
    <p class="info-text">Your average flights this week was: ${week}</p>
    `
  },

  displayStairsAvg(event, activity) {
    let stairsMainCard = document.getElementById('stairsMainCard');
    let stairsInfoCard = document.getElementById('stairsInfoCard')
    this.flipCard(stairsMainCard, stairsInfoCard)

    stairsInfoCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="stairsGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`
    let avgFlights = activity.getAvgFlightsOnDay();
    return  stairsInfoCard.innerHTML += `
    <p class="info-text">Average daily flights: ${avgFlights}</p>
    `
  },

  displaySleepWeek(event, sleep, todayDate) {
    let sleepMainCard = document.getElementById('sleepMainCard');
    let sleepCalendarCard = document.getElementById('sleepCalendarCard');
    this.flipCard(sleepMainCard, sleepCalendarCard)

    let week = sleep.getWeekOfSleepData(todayDate)
    let avgWeekHr = sleep.calculateAverageHoursThisWeek(todayDate)
    let avgWeekQual = sleep.calculateAverageQualityThisWeek(todayDate)
    sleepCalendarCard.innerHTML = `
    <button type="button" name="button" class="go-back-button" id="sleepGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>
    <!-- <p class="info-text">Average hours slept: ${avgWeekHr}</p>
    <p class="info-text">Average quality this week: ${avgWeekQual}</p> -->
    `
    let dailyHours = week.forEach(day => {
      return  sleepCalendarCard.innerHTML += `<p class="calendar-text">${day.date} : ${day.hoursSlept}</p>`
    })
  },

  displaySleepAvg(event, sleep) {
    let sleepMainCard = document.getElementById('sleepMainCard');
    let sleepInfoCard = document.getElementById('sleepInfoCard');
    this.flipCard(sleepMainCard, sleepInfoCard)

    sleepInfoCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="sleepGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`

    let avgHours = sleep.getAvgHoursSleptPerDay();
    let avgQuality = sleep.getAllTimeAvgSleepQuality();

    return  sleepInfoCard.innerHTML += `
    <p class="info-text">Average daily hours of sleep: ${avgHours}</p>
    <p class="info-text">Average daily quality of sleep: ${avgQuality}</p>
    `
  },

  clearErrors() {
    document.getElementById('dateError').classList.add('hide');
    document.getElementById('hourError').classList.add('hide');
    document.getElementById('qualityError').classList.add('hide');
  },

  toggleHidden(element) {
    element.classList.toggle('hide');
  },

}


export default domUpdates;
