import { expect } from 'chai';

import User from '../src/User';
import testUserData from './test-data/test-users';


describe('User', () => {
  let user;
  beforeEach(() => {
    user = new User(testUserData[0])
  })
  it('should be a function', () => {
    expect(User).to.be.a('function');
  });
  it('should be an instance of user', () => {
    expect(user).to.be.an.instanceof(User);
  });
  it('should have an id', () => {
    expect(user.id).to.equal(1);
  });
  it('should have a name', () => {
    expect(user.name).to.equal('Luisa Hane');
  });
  it('should have an address', () => {
    expect(user.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
  });
  it('should have an email address', () => {
    expect(user.email).to.equal('Diana.Hayes1@hotmail.com');
  });
  it('should have a stride length', () => {
    expect(user.strideLength).to.equal(4.3);
  });
  it('should have a daily step goal', () => {
    expect(user.dailyStepGoal).to.equal(10000);
  });
  it('should have friends', () => {
    expect(user.friends).to.deep.equal([2, 3, 4]);
  });
  it('getFirstName should return the first name of the user', () => {
    expect(user.getFirstName()).to.equal('LUISA');
  });
  //
  // it('findFriendsNames should find the first names of friends', function() {
  //   let user2 = new User({
  //     'id': 16,
  //     'name': 'Ben Nist',
  //   })
  //   let user3 = new User({
  //     'id': 4,
  //     'name': 'John Firth',
  //   })
  //   let user4 = new User({
  //     'id': 8,
  //     'name': 'Nick Adams',
  //   })
  //   let users = [user2, user3, user4];
  //   user.findFriendsNames(users);
  //   expect(user.friendsNames).to.deep.equal(['BEN', 'JOHN', 'NICK']);
  // });
});
