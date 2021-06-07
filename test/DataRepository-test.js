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

  it('Should contain data for multiple users', () => {
    expect(dataRepo.dataSet[0]).to.deep.equal({
      'userID': 1,
      'date': '2019/06/15',
      'hoursSlept': 6.1,
      'sleepQuality': 2.2
    });
    expect(dataRepo.dataSet[2]).to.deep.equal({
      'userID': 3,
      'date': '2019/06/15',
      'hoursSlept': 10.8,
      'sleepQuality': 4.7
    });
  });

  it('Should contain data for a particular user ID', () => {
    expect(dataRepo.userData[1].userID).to.equal(2);
    expect(dataRepo.userData[2].userID).to.equal(2);
    expect(dataRepo.userData[3].userID).to.equal(2);
  });

  it('Should get the value of a given property on a specific date', () => {
    expect(dataRepo.getGivenDayValue('2019/06/18', 'hoursSlept')).to.equal(10.8);
  });

  it('Should get a week of values for a given date and property', () => {
    expect(dataRepo.getWeekValues('2019/06/24', 'sleepQuality')).to.deep.equal([
      {
        'userID': 2,
        'date': '2019/06/18',
        'hoursSlept': 10.8,
        'sleepQuality': 3.2
      },
      {
        'userID': 2,
        'date': '2019/06/19',
        'hoursSlept': 9.6,
        'sleepQuality': 2.5
      },
      {
        'userID': 2,
        'date': '2019/06/20',
        'hoursSlept': 10.1,
        'sleepQuality': 2.4
      },
      {
        'userID': 2,
        'date': '2019/06/21',
        'hoursSlept': 4.3,
        'sleepQuality': 4.8
      },
      {
        'userID': 2,
        'date': '2019/06/22',
        'hoursSlept': 4.8,
        'sleepQuality': 3.3
      },
      {
        'userID': 2,
        'date': '2019/06/23',
        'hoursSlept': 8,
        'sleepQuality': 4.9
      },
      {
        'userID': 2,
        'date': '2019/06/24',
        'hoursSlept': 10.8,
        'sleepQuality': 1
      }
    ]);
  });

  it('Should calculate the all time average for a particular property', () => {
    expect(dataRepo.getAllTimeAvgDaily('hoursSlept')).to.equal(7.9);
  });

  it('Should find the highest value of a property in the data set', () => {
    expect(dataRepo.getHighestValue(dataRepo.userData, 'sleepQuality')).to.equal(4.9);
  });

  it('Should get the average value of a property over a given week', () => {
    expect(dataRepo.getWeeklyAverage('2019/06/23', 'hoursSlept')).to.equal(7.6);
  });

  it('Should return false if an invalid date is entered', () => {
    expect(dataRepo.getWeeklyAverage('2019/06/14', 'hoursSlept')).to.equal(false);
    expect(dataRepo.getWeeklyAverage('pizza', 'hoursSlept')).to.equal(false);
  });
});
