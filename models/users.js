const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 0,
        maxlength: 255,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 0,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);


function validate(user) {
    const schema = Joi.object({
        name: Joi.string().min(0).max(255).required(),
        email: Joi.string().min(0).max(255).required().email(),
        password: Joi.string().min(8).max(255).required(),
    })

    return schema.validate(user);
}


exports.User = User;
exports.validate = validate;