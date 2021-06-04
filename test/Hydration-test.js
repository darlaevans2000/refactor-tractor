import { expect } from 'chai';

import Hydration from '../src/Hydration';
import UserRepository from '../src/UserRepository';
import User from '../src/User';
import DataRepository from '../src/DataRepository'
import testHydrationData from './test-data/test-hydration'
import testUserData from './test-data/test-users'

describe('Hydration', function() {
  let hydration, dataRepo, user, user1;

  beforeEach(() => {
    user1 = testUserData[0];
    user = new User(user1);
    dataRepo = new DataRepository(user.id, testHydrationData);
    hydration = new Hydration(user.id, testHydrationData);
  })
  it('should be a function', () => {
    expect(Hydration).to.be.a('function');
  });
  it('should be an instance of Hydration', () => {
    expect(hydration).to.be.an.instanceof(Hydration);
  });
  it('should have an id', () => {
    expect(hydration.id).to.equal(1);
  });

  it('should have a date', () => {
    expect(hydrate3.date).to.equal('2019/06/16');
  });

  describe('drink', () => {
    it('should update the average number of ounces over all time', () => {
      expect(user2.ouncesAverage).to.equal(83);
    })
    it('should add the date and amount to the object record', function() {
      expect(user1.ouncesRecord).to.deep.equal([{"2019/06/15": 37}])
      expect(user2.ouncesRecord.length).to.equal(2)
    })
  });
});
