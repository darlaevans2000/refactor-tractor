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
         return  hydrationCalendarCard.innerHTML += `${day.date}: ${day.numOunces}`
       });
  },

  displayHydrationAvg(event, hydration) {
    let hydrationMainCard = document.getElementById('hydrationMainCard');
    let hydrationInfoCard = document.getElementById('hydrationInfoCard');
    this.flipCard(hydrationMainCard, hydrationInfoCard )
    hydrationInfoCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="hydrationGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`

    let avg = hydration.getAllTimeAvgOz();
    return  hydrationInfoCard.innerHTML += `Your average daily consumption is: ${avg} oz!`
  },

  displayStepsWeek(event, activity, todayDate) {
    let stepsMainCard = document.getElementById('stepsMainCard');
    let stepsCalendarCard = document.getElementById('stepsCalendarCard');
    this.flipCard(stepsMainCard, stepsCalendarCard)

    stepsCalendarCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="stepsGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`
    let weekSteps = activity.getAvgStepsThruWeek(todayDate);
    let weekActiveMin = activity.getAvgActivityThruWeek(todayDate);
       return  stepsCalendarCard.innerHTML += `
       Your average daily steps this week was: ${weekSteps}
       Your average minutes active was: ${weekActiveMin}`
    },

  displayStepsAvg(event, activity) {
    let stepsMainCard = document.getElementById('stepsMainCard');
    let stepsInfoCard = document.getElementById('stepsInfoCard');
    this.flipCard(stepsMainCard, stepsInfoCard)


    stepsInfoCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="stepsGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`
    let avgStepDay = activity.getAvgStepsOnDay();
    let avgMinDay = activity.getAvgMinutesOnDay();
    return  stepsInfoCard.innerHTML += `
    Your average daily steps: ${avgStepDay}
    Your average daily active minutes: ${avgMinDay}
    `
  },

  displayStairsWeek(event, activity, todayDate) {
    let stairsMainCard = document.getElementById('stairsMainCard');
    let stairsCalendarCard = document.getElementById('stairsCalendarCard');
    this.flipCard(stairsMainCard, stairsCalendarCard)

    stairsCalendarCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="stairsGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`
    let week = activity.getAvgFlightsThruWeek(todayDate);
    return  stairsCalendarCard.innerHTML += `
    Your average flights this week was: ${week}
    `
  },

  displayStairsAvg(event, activity) {
    let stairsMainCard = document.getElementById('stairsMainCard');
    let stairsInfoCard = document.getElementById('stairsInfoCard')
    this.flipCard(stairsMainCard, stairsInfoCard)

    stairsInfoCard.innerHTML = `<button type="button" name="button" class="go-back-button" id="stairsGoBackButton"><i class="fas fa-arrow-alt-circle-left"></i></button>`
    let avgFlights = activity.getAvgFlightsOnDay();
    return  stairsInfoCard.innerHTML += `
    Your average daily flights: ${avgFlights}
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
    Average hours slept: ${avgWeekHr}
    Average quality this week: ${avgWeekQual}
    `
    let dailyHours = week.forEach(day => {
      return  sleepCalendarCard.innerHTML += `${day.date} : ${day.hoursSlept}`
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
    Average daily hours of sleep: ${avgHours}
    Average daily quality of sleep: ${avgQuality}
    `
  },


}


export default domUpdates;
