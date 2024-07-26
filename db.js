const dotenv = require('dotenv');
dotenv.config();
const {MongoClient} = require('mongodb');

const client = new MongoClient(process.env.CONNECTIONSTRING);

async function start(){
    await client.connect();
    module.exports = client.db();
    const app = require('./app');
    app.listen(process.env.PORT, () => {
        console.log(`your app is connected to the database and is running on port: ${process.env.PORT} 👋🤠`);
    });
}

start();