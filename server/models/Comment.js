const mongoose = require('mongoose')
const Joi = require('joi')

const Comment = mongoose.model('comments', mongoose.Schema({
    text: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}))

const commentValidater = Joi.object({
    text: Joi.string().required(),
    creater: Joi.string().min(24).max(24)
})


module.exports = {Comment, commentValidater } 