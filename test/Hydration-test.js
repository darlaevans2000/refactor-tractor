import { expect } from 'chai';

import Hydration from '../src/Hydration';
import UserRepository from '../src/UserRepository';
import User from '../src/User';
import DataRepository from '../src/DataRepository';
import testHydrationData from './test-data/test-hydration';
import testUserData from './test-data/test-users';

describe('Hydration', () => {
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
  it('should have the same userID for the dataset', () => {
    let day1Data = hydration.userData[0]
    let day10Data = hydration.userData[9]
    expect(day1Data.userID).to.equal(1);
    expect(day10Data.userID).to.equal(1);
  });

  it('should be able to find the overall average H2O consumed by a user', () => {
    hydration.getAllTimeAvgOz();
    expect(hydration.getAllTimeAvgOz()).to.equal(60);
  });

  it('should find the number of ounces drank on a given day', () => {
    let waterOnDate = hydration.getOzOnDate("2019/06/17", 'numOunces');
    expect(waterOnDate).to.equal(96);
  });

  it('should find the number of ounces drank per day for any given week', () => {
    let weekOfWater = hydration.getWeekOfOz("2019/06/24",'numOunces');
    expect(weekOfWater.length).to.equal(7);
  })

  // it('should return an error if there is no data for the date input' () => {
  //
  // })
  //
  // it('should return an error if the date input does not match the format' () => {
  //
  // })

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
