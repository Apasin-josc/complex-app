const bcrypt = require('bcryptjs');
const usersCollection = require('../db').db().collection('users');
const validator = require('validator');

let User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.cleanUp = function () {
  if (typeof this.data.username != 'string') {
    this.data.username = '';
  }
  if (typeof this.data.email != 'string') {
    this.data.email = '';
  }
  if (typeof this.data.password != 'string') {
    this.data.password = '';
  }
  //get rid of any bogus properties
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
  };
};

User.prototype.login = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    const attemptedUser = await usersCollection.findOne({
      username: this.data.username,
    });
    if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
      resolve('Congratsss!');
    } else {
      reject('Invalid username/password');
    }
  });
};

User.prototype.validate = function () {
  if (this.data.username == '') {
    this.errors.push('You must provided a username.');
  }
  if (
    this.data.username != '' &&
    !validator.isAlphanumeric(this.data.username)
  ) {
    this.errors.push('username can only contain letters and numbers');
  }
  if (!validator.isEmail(this.data.email)) {
    this.errors.push('You must provided a valid email.');
  }
  if (this.data.password == '') {
    this.errors.push('You must provided a password.');
  }
  if (this.data.password.length > 0 && this.data.password.length < 12) {
    this.errors.push('Your password must be at least 12 characters');
  }
  if (this.data.password.length > 50) {
    this.errors.push('your password cannot exceed 100 characters');
  }
  if (this.data.username.length > 0 && this.data.username.length < 3) {
    this.errors.push('your username must be at least 3 characters long');
  }
  if (this.data.username.length > 100) {
    this.errors.push('your user cannot exceed 20 characters');
  }
};
User.prototype.register = function () {
  //step #1: validate user data
  this.cleanUp();
  this.validate();
  //step #2: only if there are no validation errors then save the user data
  //into our database 🫵
  if (!this.errors.length) {
    //hash user password
    let salt = bcrypt.genSaltSync(10);
    this.data.password = bcrypt.hashSync(this.data.password, salt);
    //creating a new document
    usersCollection.insertOne(this.data);
  }
};

module.exports = User;
