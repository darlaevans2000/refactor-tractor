import { expect } from 'chai';

import DataRepository from '../src/DataRepository';
import Sleep from '../src/Sleep';
import User from '../src/User';
import testSleepData from './test-data/test-sleep';
import testUserData from './test-data/test-users';

describe.only('Sleep', function() {
  let sleepData, user1;

  beforeEach(() => {
    sleepData = new Sleep(1, testSleepData);
    user1 = new User(testUserData[1]);
  });

  it('Should be a function', function() {
    expect(Sleep).to.be.a('function');
  });

  it('Should be an instance of Sleep', function() {
    expect(sleepData).to.be.an.instanceof(Sleep);
  });

  it('Should contain user sleep data', function() {
    expect(sleepData.userData[2]).to.deep.equal({ userID: 1, date: '2019/06/17', hoursSlept: 8, sleepQuality: 2.6 });
  });

  it('Should calculate the average hours slept per day for all time', function() {
    expect(sleepData.getAvgHoursSleptPerDay()).to.equal(7.9);
  });

  it('Should calculate the average sleep quality over all time', function() {
    expect(sleepData.getAllTimeAvgSleepQuality()).to.equal(2.4);
  })
});
