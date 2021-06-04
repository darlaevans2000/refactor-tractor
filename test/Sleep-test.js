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

  it('should be a function', function() {
    expect(Sleep).to.be.a('function');
  });
  it('should be an instance of activity', function() {
    expect(sleep1).to.be.an.instanceof(Sleep);
  });
  it('should hold a userId', function() {
    expect(sleep2.userId).to.equal(2);
  });
  it('should hold a date', function() {
    expect(sleep3.date).to.equal("2019/07/17");
  });
  it('should hold hours slept', function() {
    expect(sleep1.hoursSlept).to.equal(6.1);
  });
  it('should hold sleep quality', function() {
    expect(sleep3.sleepQuality).to.equal(1.4);
  });
  describe('sleep', function() {
    it('should update user\'s slept hours record', function() {
      expect(user1.sleepHoursRecord.length).to.equal(2);
    });
    it('should update user\'s slept hours record', function() {
      expect(user2.sleepQualityRecord.length).to.equal(1);
    });
    it('should update user\'s slept hours average', function() {
      expect(user1.hoursSleptAverage).to.equal('7.7');
    });
    it('should update user\'s sleep quality average', function() {
      expect(user1.sleepQualityAverage).to.equal('1.8');
    });
  })
});
