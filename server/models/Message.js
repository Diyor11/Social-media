const mongoose = require('mongoose')
const Joi = require('joi')

const Message = mongoose.model('messages', mongoose.Schema({
    text: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        require: true
    },
    sender: {
        type: String,
        require: true
    },
    reciver: {
        type: String,
        require: true
    }
}))

const messageValidater = Joi.object({
    text: Joi.string().min(1).required().max(100),
    reciver: Joi.string().min(24).max(24).required()
})


module.exports = { Message, messageValidater } 