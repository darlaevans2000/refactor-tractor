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
    // dataRepo = new DataRepository(user.id, testActivityData);
  });


  it('should be a function', function() {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of activity', function() {
    expect(activity).to.be.an.instanceof(Activity);
  });
//   it('should hold a userId', function() {
//     expect(activity2.userId).to.equal(2);
//   });
//   it('should hold a date', function() {
//     expect(activity1.date).to.equal("2019/06/15");
//   });
//   it('should hold number of steps', function() {
//     expect(activity1.steps).to.equal(3684);
//   });
//   it('should hold minutes active', function() {
//     expect(activity2.minutesActive).to.equal(280);
//   });
//   it('should hold flights of stairs', function() {
//     expect(activity2.flightsOfStairs).to.equal(22);
//   });
//   it('should have a default value of 0 for miles walked', function() {
//     expect(activity2.milesWalked).to.equal(0);
//   });
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