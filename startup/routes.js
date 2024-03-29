const express = require('express');
const home = require('../routes/home')
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/genres', genres);
    app.use('/customers', customers);
    app.use('/movies', movies);
    app.use('/rentals', rentals);
    app.use('/users', users);
    app.use('/auth', auth);
    app.use(error);
}