require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const home = require('./routes/home')
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');

winston.exceptions.handle(new winston.transports.File({filename: 'uncaughtExceptions.log'}));


process.on('unhandledRejection', error => {
    throw Error(error);
});


winston.add(new winston.transports.File({filename: 'logfile.log'}));
winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/vidly', level: 'warn'}));

// throw new Error('synchronous error');
//
// const p = Promise.reject(new Error('asynchronous error'));
// p.then(value => console.log('Done'));

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(()=> console.log('Connected to Vidly successfully...'))
    .catch(reason => console.log(`Unable to connect to Vidly!!! ${reason}`));


app.use(express.json());
app.use('/', home);
app.use('/genres', genres);
app.use('/customers', customers);
app.use('/movies', movies);
app.use('/rentals', rentals);
app.use('/users', users);
app.use('/auth', auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at port ${port}.....`);
});