const express = require('express');
const bodyParser = require('body-parser');

const todo = require('./routes/todo.route');
const app = express();

const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://ghada:Ghada123456@cluster0-m5kxc.mongodb.net/test?retryWrites=true';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/todos', todo);

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

let port = 3400;
app.listen(port, () => {
    console.log('Server listening to port: ' + port);
})

module.exports = app;