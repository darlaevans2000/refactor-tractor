import { expect } from 'chai'
import Activity from '../src/Activity';
import UserRepository from '../src/UserRepository';
import User from '../src/User';
import DataRepository from '../src/DataRepository';
import testActivityData from './test-data/test-activity';
import testUserData from './test-data/test-users';

describe.only('Activity', () => {
  let activity, user, user1;

  beforeEach(() => {
    user1 = testUserData[0];
    user = new User(user1);
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
    expect(activity.userData[0]).to.deep.equal({"userID": 1, "date": "2019/06/15", "numSteps": 3577, "minutesActive": 140, "flightsOfStairs": 16});
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
  // it('should have a default value of 0 for miles walked', function() {
  //   expect(activity.milesWalked).to.equal(0);
  // });
//   it('should have a default value of null for reached step goal', function() {
//     expect(activity2.reachedStepGoal).to.equal(null);
//   });
//   it('doActivity should add activities to user record', function() {
//     expect(user1.activityRecord.length).to.equal(1);
//   });
//   it('should have a method that calculate miles walked', function() {
//     expect(activity1.calculateMiles(userRepository)).to.equal('3.0');
//   });
//   describe('compareStepGoal', function() {
//     it('should return false if goal isn\'t met', function() {
//       activity1.compareStepGoal(userRepository);
//       expect(activity1.reachedStepGoal).to.equal(false);
//     });
//     it('should return true if goal is met', function() {
//       activity2.compareStepGoal(userRepository);
//       expect(activity2.reachedStepGoal).to.equal(true);
//     });
});