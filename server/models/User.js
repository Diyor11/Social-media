const mongoose = require('mongoose')
const Joi = require('joi')

const User = mongoose.model('Users', mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        min: 6
    },
    profilePicture: {
        type: String,
        default: ''
    },
    followers: {
        type: [String],
        default: []
    },
    followings: {
        type: [String],
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    relationShip: {
        type: String
    }
}, {timestamps: true}))


const userSignUpValidater = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(6).max(50).required(),
    profilePicture: Joi.string(),
    followers: Joi.array().items(Joi.string()),
    followings: Joi.array().items(Joi.string()),
    isAdmin: Joi.boolean(),
    from: Joi.string().min(3).required(),
    city: Joi.string().min(3).required()
})

const userSignInValidater = Joi.object({
    password: Joi.string().min(6).max(20).required(),
    email: Joi.string().email().max(20).required()
})

const userUpdateValidater = Joi.object({
    desc: Joi.string().max(50),
    city: Joi.string().max(50),
    from: Joi.string().max(50),
    relationShip: Joi.string(),
    profilePicture: Joi.string().min(200)
})

module.exports = {User, userSignUpValidater, userSignInValidater, userUpdateValidater}
