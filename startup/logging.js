const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    winston.exceptions.handle(
        new winston.transports.Console({colorize: true, prettyPrint:true}),
        new winston.transports.File({filename: 'uncaughtExceptions.log'})
);


    process.on('unhandledRejection', error => {
        throw Error(error);
    });


    winston.add(new winston.transports.File({filename: 'logfile.log'}));
    winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/vidly', level: 'warn'}));

}