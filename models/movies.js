const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genres');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    genre: genreSchema,
    numberInStock: {
        type: Number,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255
    }
}));

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(255),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255),
        dailyRentalRate: Joi.number().min(0).max(255)
    });
    return schema.validate(movie);
}


exports.Movie = Movie;
exports.validate = validateMovie;
