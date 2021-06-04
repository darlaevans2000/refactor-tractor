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

  it('should be an instance of Sleep', function() {
    expect(sleepData).to.be.an.instanceof(Sleep);
  });

});
