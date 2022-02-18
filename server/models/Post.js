const mongoose = require('mongoose')
const Joi = require('joi')

const Post = mongoose.model('posts', mongoose.Schema({
    creater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    desc: {
        type: String,
        max: 500,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    likes: {
        type: [String],
    },
    comments: {
        type: [{type: mongoose.Schema.Types.ObjectId}]
    },
    createdAt: {type: Date}
}))

const postValidater = Joi.object({
    desc: Joi.string().min(2).max(500).required(),
    img: Joi.string().required().min(100),
})


module.exports = { Post, postValidater }