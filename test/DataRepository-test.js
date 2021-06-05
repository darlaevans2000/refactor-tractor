import { expect } from 'chai';

import DataRepository from '../src/DataRepository';
import testSleepData from './test-data/test-sleep';

describe.only('DataRepository', () => {
  let dataRepo;

  beforeEach(() => {
    dataRepo = new DataRepository(2, testSleepData);
  });

  it('Should be a function', () => {
    expect(DataRepository).to.be.a('function');
  });

  it('Should be an instance of DataRepository', () => {
    expect(dataRepo).to.be.an.instanceof(DataRepository);
  });

  it('Should contain user data', () => {
    expect(dataRepo.userData[0]).to.deep.equal({
      'userID': 2,
      'date': '2019/06/15',
      'hoursSlept': 7,
      'sleepQuality': 4.7
    });
  });

  it('Should contain data for a particular user ID', () => {
    expect(dataRepo.userData[1].userID).to.equal(2);
    expect(dataRepo.userData[2].userID).to.equal(2);
    expect(dataRepo.userData[3].userID).to.equal(2);
  });


});
