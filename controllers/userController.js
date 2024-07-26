const User = require('../models/User');

const express = require('express');

exports.login = function (req, res) {
  let user = new User(req.body);
  user.login(function(result){
    res.send(result);
  });
};

exports.logout = (req, res) => {};

exports.register = (req, res) => {
  let user = new User(req.body);
  user.register();
  //if there's a error it's going to be pushed into our page
  if (user.errors.length) {
    res.send(user.errors);
  } else {
    res.send('congrats, there are no errors buddy!');
  }
};

exports.home = (req, res) => {
  res.render('home-guest');
};
