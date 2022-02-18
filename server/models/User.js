const mongoose = require('mongoose')
const Joi = require('joi')

const User = mongoose.model('users', mongoose.Schema({
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
        min: 6,
        require: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    friends: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
    },
    posts: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'posts'}]
    },
    info: {
        desc: {
            type: String,
            max: 50,
            default: ''
        },
        city: {
            type: String,
            max: 50,
            require: true
        },
        from: {
            type: String,
            max: 50,
            require: true
        },
        relationShip: {
            type: String,
            default: 'single'
        }
    },
}))


const userSignUpValidater = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(6).max(50).required(),
    info: Joi.object({
        from: Joi.string().min(3).required(),
        city: Joi.string().min(3).required()
    }).required()
})

const userSignInValidater = Joi.object({
    password: Joi.string().min(6).max(20).required(),
    email: Joi.string().email().max(20).required()
})

const userUpdateValidater = Joi.object({
    profilePicture: Joi.string().min(100),
    info: Joi.object({
        desc: Joi.string().max(50),
        city: Joi.string().max(50),
        from: Joi.string().max(50),
        relationShip: Joi.string(),
    })
})

module.exports = {User, userSignUpValidater, userSignInValidater, userUpdateValidater}
