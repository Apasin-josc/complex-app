const express = require('express');
const port = 3000;
const app = express();

const router = require('./router');

app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use('/', router);

app.listen(port, () => {
	console.log(`your server is running on the port: ${port}`)
})