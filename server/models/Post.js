const mongoose = require('mongoose')
const Joi = require('joi')

const Post = mongoose.model('Posts', mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        max: 500
    },
    img: {
        type: String
    },
    likes: {
        type: [String],
        default: []
    }
}, { timestamps: true }))

const postValidater = Joi.object({
    userId: Joi.string(),
    desc: Joi.string().max(500),
    img: Joi.string()
})

module.exports = { Post, postValidater }