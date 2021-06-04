import { expect } from 'chai';

import Hydration from '../src/Hydration';
import UserRepository from '../src/UserRepository';
import User from '../src/User';
import DataRepository from '../src/DataRepository';
import testHydrationData from './test-data/test-hydration';
import testUserData from './test-data/test-users';

describe.only('Hydration', () => {
  let hydration, dataRepo, user, user1;

  beforeEach(() => {
    user1 = testUserData[0];
    user = new User(user1);
    dataRepo = new DataRepository(user.id, testHydrationData);
    hydration = new Hydration(user.id, testHydrationData);
  });

  it('should be a function', () => {
    expect(Hydration).to.be.a('function');
  });
  it('should be an instance of Hydration', () => {
    expect(hydration).to.be.an.instanceof(Hydration);
  });
  it('should have an id', () => {
    expect(hydration.id).to.equal(1);
  });

  it('should be able to find the overall average H2O consumed by a user', () => {
    hydration.getAllTimeAvgOz(testHydrationData.numOunces);
    expect(hydration.getAllTimeAvgOz()).to.equal(60);
  });

  it('should find the number of ounces drank on a given day', () => {
    hydration.getOzOnDate("2019/06/17", testHydrationData.numOunces);
    expect(hydration.getOzOnDate()).to.equal(96);
  });

  it('should find the number of ounces drank per day for any given week', () => {
    hydration.getWeekOfOz("2019/06/24",testHydrationData.numOunces);
    expect(weekValues.length).to.equal(7);
  })

  // it('should have a date', () => {
  //   expect(hydrate3.date).to.equal('2019/06/16');
  // });
  //
  // describe('drink', () => {
  //   it('should update the average number of ounces over all time', () => {
  //     expect(user2.ouncesAverage).to.equal(83);
  //   })
  //   it('should add the date and amount to the object record', function() {
  //     expect(user1.ouncesRecord).to.deep.equal([{"2019/06/15": 37}])
  //     expect(user2.ouncesRecord.length).to.equal(2)
  //   })
  // });
});
