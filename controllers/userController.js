const User = require('../models/User');

const express = require('express');

exports.login = function (req, res) {
  let user = new User(req.body);
  user
    .login()
    .then(function (result) {
      req.session.user = {favColor: 'orange', username: user.data.username};
      req.session.save(function (){
        res.redirect('/');
      });
    })
    .catch(function (e) {
      res.send(e);
    });
};

exports.logout = (req, res) => {
  req.session.destroy(function () {
    res.redirect('/');
  });
};

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
  if(req.session.user){
    res.render('home-dashboard', {username: req.session.user.username});
  }else{
    res.render('home-guest');
  }
};
