import { expect } from 'chai';

import DataRepository from '../src/DataRepository';
import Sleep from '../src/Sleep';
import User from '../src/User';
import testSleepData from './test-data/test-sleep';
import testUserData from './test-data/test-users';

describe('Sleep', function() {
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
  });

  it('Should return a week of sleep data values', function() {
    expect(sleepData.getWeekOfSleepData('2019/06/24')).to.deep.equal([
      {
        "userID": 1,
        "date": "2019/06/18",
        "hoursSlept": 10.4,
        "sleepQuality": 3.1
      },
      {
        "userID": 1,
        "date": "2019/06/19",
        "hoursSlept": 10.7,
        "sleepQuality": 1.2
      },
      {
        "userID": 1,
        "date": "2019/06/20",
        "hoursSlept": 9.3,
        "sleepQuality": 1.2
      },
      {
        "userID": 1,
        "date": "2019/06/21",
        "hoursSlept": 7.8,
        "sleepQuality": 4.2
      },
      {
        "userID": 1,
        "date": "2019/06/22",
        "hoursSlept": 7,
        "sleepQuality": 3
      },
      {
        "userID": 1,
        "date": "2019/06/23",
        "hoursSlept": 7.8,
        "sleepQuality": 1.5
      },
      {
        "userID": 1,
        "date": "2019/06/24",
        "hoursSlept": 8,
        "sleepQuality": 1.3
      }
    ]);
  });

  it('Should return false if an invalid date is entered', function() {
    expect(sleepData.getWeekOfSleepData('2019/06/16')).to.equal(false);
    expect(sleepData.getWeekOfSleepData('aaaaaaa')).to.equal(false);
    expect(sleepData.getWeekOfSleepData('06/14/2021')).to.equal(false);
  });

  it('Should calculate the average hours slept over a given week', function() {
    expect(sleepData.calculateAverageHoursThisWeek('2019/06/24')).to.equal(8.7);
  });

  it('Should calculate the average sleep quality over a given week', function() {
    expect(sleepData.calculateAverageQualityThisWeek('2019/06/24')).to.equal(2.2);
  });

  it('Should return false if an invalid date is entered', function() {
    expect(sleepData.calculateAverageHoursThisWeek('2019/06/16')).to.equal(false);
    expect(sleepData.calculateAverageHoursThisWeek('fish')).to.equal(false);
  });

  it('Should get the number of hours slept on a given date', function() {
    expect(sleepData.getHoursSleptOnDate('2019/06/18')).to.equal(10.4);
  });

  it('Should get the sleep quality for a given date', function() {
    expect(sleepData.getSleepQualityOnDate('2019/06/18')).to.equal(3.1);
  });
});
