import { expect } from 'chai';

import UserRepository from '../src/UserRepository';
import User from '../src/User';
import Sleep from '../src/Sleep';

import testSleepData from './test-data/test-sleep';
import testActivityData from './test-data/test-activity';

describe.only('UserRepository', function() {
  let user1, user2, user3, userRepository;

  beforeEach(() => {
    user1 = new User({
      'id': 1,
      'name': 'Luisa Hane',
      'address': '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
      'email': 'Diana.Hayes1@hotmail.com',
      'strideLength': 4.3,
      'dailyStepGoal': 10000,
      'friends': [
        2,
        4,
        3
      ]
    });
    user2 = new User({
      'id': 2,
      'name': 'Jarvis Considine',
      'address': '30086 Kathryn Port, Ciceroland NE 07273',
      'email': 'Dimitri.Bechtelar11@gmail.com',
      'strideLength': 4.5,
      'dailyStepGoal': 5000,
      'friends': [
        1,
        3,
        4
      ]
    });
    user3 = new User({
      'id': 3,
      'name': 'Herminia Witting',
      'address': '85823 Bosco Fork, East Oscarstad MI 85126-5660',
      'email': 'Elwin.Tromp@yahoo.com',
      'strideLength': 4.4,
      'dailyStepGoal': 15000,
      'friends': [
        1,
        2,
        4
      ]
    });
    userRepository = new UserRepository();
    userRepository.users.push(user1, user2, user3);
  });

  it('should be a function', function() {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of user repository', function() {
    expect(userRepository).to.be.an.instanceof(UserRepository);
  });

  it('should hold an array of users', function() {
    expect(userRepository.users).to.deep.equal([user1, user2, user3]);
    expect(userRepository.users.length).to.equal(3);
  });

  it('getUser should return user object when given a user id', function() {
    expect(userRepository.getUser(2)).to.equal(user2);
  });

  it('calculateAverageStepGoal should return average step goal for all users', function() {
    expect(userRepository.calculateAverageStepGoal()).to.equal(10000);
  });

  it('calculateAverageSleepQuality should return average sleep quality for all users', function() {
    expect(userRepository.calculateAverageSleepQuality(testSleepData)).to.equal(2.9);
  });

  it('should have a method that finds the longest sleepers', function() {
    expect(userRepository.getLongestSleepers("2019/06/15", testSleepData)).to.equal(3);
  });

  it('should calculate the average number of stairs climbed by all users on a given day', function() {
    expect(userRepository.calculateAverageActivity(testActivityData, '2019/06/23', 'flightsOfStairs')).to.equal(8);
  });

  it('should calculate the average number of steps taken by all users on a given day', function() {
    expect(userRepository.calculateAverageActivity(testActivityData, '2019/06/19', 'numSteps')).to.equal(10675);
  });

  it('should have a method that calculates average number of active minutes for users', function() {
    expect(userRepository.calculateAverageActivity(testActivityData, '2019/06/21', 'minutesActive')).to.equal(163);
  });

  // // Sleep quality > 3 for a given week
  // it.skip('should have a method that finds the best sleepers', function() {
  //   expect(userRepository.findBestSleepers("2019/06/16")).to.deep.equal([user1, user2]);
  // });
});
