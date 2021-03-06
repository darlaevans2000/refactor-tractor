import { expect } from 'chai'
import Activity from '../src/Activity';
import User from '../src/User';
import testActivityData from './test-data/test-activity';
import testUserData from './test-data/test-users';

describe('Activity', () => {
  let activity, userActivity, user, user1;

  beforeEach(() => {
    user1 = testUserData[0];
    user = new User(user1);
    userActivity = testActivityData[0];
    activity = new Activity(user.id, testActivityData);
  });


  it('should be a function', function() {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of activity', function() {
    expect(activity).to.be.an.instanceof(Activity);
  });

  it('should have the same userID for the dataset', function() {
    let day1Data = activity.userData[0]
    let day10Data = activity.userData[9]

    expect(day1Data.userID).to.equal(1);
    expect(day10Data.userID).to.equal(1);
  });

  it('should hold a date', function() {
    let day1Data = activity.userData[0]
    let day10Data = activity.userData[9]

    expect(day1Data.date).to.equal('2019/06/15');
    expect(day10Data.date).to.equal('2019/06/24');
  });

  it('Should contain user activity data', function() {
    expect(activity.userData[0]).to.deep.equal({
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 3577,
      "minutesActive": 140,
      "flightsOfStairs": 16
    });
  });

  it('should return the number of steps a user had on a given day', function() {
    expect(activity.getStepsTaken("2019/06/15")).to.equal(3577);
  });

  it('should return the number of minutes a user was active on a given day', function() {
    expect(activity.getMinutesActive("2019/06/15")).to.equal(140);
  });

  it('should return the number of flights of stairs a user did on a given day', function() {
    expect(activity.getFlightsClimbed("2019/06/15")).to.equal(16);
  });

  it('should return the average number of minutes of activity for a week', function() {
    expect(activity.getAvgActivityThruWeek('2019/06/24')).to.equal(153.9);
  });

  it('should return the average number of steps for a week', function() {
    expect(activity.getAvgStepsThruWeek('2019/06/24')).to.equal(9355.6);
  });

  it('should return the average number of flights of stairs for a week', function() {
    expect(activity.getAvgFlightsThruWeek('2019/06/24')).to.equal(13.6);
  });

  it('should return the number of miles a user walked on a given day', function() {
    let feetWalked = user1.strideLength * testActivityData[0].numSteps;
    expect(activity.getMilesWalked("2019/06/15", user1)).to.equal(feetWalked / 5280);
  });

  it('Should calculate the average steps per day for all time', function() {
    expect(activity.getAvgStepsOnDay()).to.equal(9003.2);
  });

  it('Should calculate the average flights of stairs climbed per day for all time', function() {
    expect(activity.getAvgFlightsOnDay()).to.equal(16.5);
  });

  it('should return false if a given user has not exceeded their step goal for a given day', function() {
    let date = testActivityData[0];
    expect(activity.achievedGoal(user, date)).to.equal(false);
  });


  it('should return true if a given user has exceeded their step goal for a given day', function() {
    const date1 = testActivityData[8];
    expect(activity.achievedGoal(user, date1)).to.equal(true);
  });

  it('should return all the days a given user has exceeded their step goal', function() {
    const date1 = testActivityData[8];
    const date2 = testActivityData[20];
    const date3 = testActivityData[28];
    const date4 = testActivityData[32];
    expect(activity.getDaysExceededGoal(user1)).to.deep.equal([date1, date2, date3, date4])
  });

  it('should return the most stairs climbed in a single day for a given user', function() {
    expect(activity.getStairRecord(user1)).to.equal(36);
  });

  it('should return the most active minutes in a single day for a given user', function() {
    expect(activity.getMinActiveRecord(user1)).to.equal(275);
  });

  it('should return the most steps in a single day for a given user', function() {
    expect(activity.getStepsRecord(user1)).to.equal(14478);
  });

  it('should identify the user day that had the most active for a single day in a given month and return the user id and how many mintues they had', function() {
    const june = '2019/06/01';
    const july = '2019/07/01';
    expect(activity.getMonthlyActivityChampion(june, july)).to.deep.equal({
      userID: 1,
      record: 275
    })
  });

});
