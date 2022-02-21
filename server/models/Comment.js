const mongoose = require('mongoose')
const Joi = require('joi')

const Comment = mongoose.model('comments', mongoose.Schema({
    text: String,
    createdAt: Date,
    postId: String,
    creater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}))

const commentValidater = Joi.object({
    text: Joi.string().min(1).required()
})


module.exports = {Comment, commentValidater } 