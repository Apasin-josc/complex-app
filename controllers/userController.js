const express = require('express');

exports.login = function(){

}

exports.logout = (req,res)=>{
    
}

exports.register = (req,res) => {
    res.send('thanks for trying to register something');
}

exports.home = (req,res) => {
    res.render('home-guest');
}