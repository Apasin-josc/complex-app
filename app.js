const express = require('express');
const port = 3000;
const app = express();

const router = require('./router');

//telling express to add the users submited data into our request object so then we can acces it from req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use('/', router);

module.exports = app;
