const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const home = require('./routes/home')
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('Connected to Vidly successfully...'))
    .catch(reason => console.log(`Unable to connect to Vidly!!! ${reason}`));


const app = express();

app.use(express.json());
app.use('/', home);
app.use('/genres', genres);
app.use('/customers', customers);
app.use('/movies', movies);
app.use('/rentals', rentals);
app.use('/users', users);
app.use('/auth', auth);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at port ${port}.....`);
});