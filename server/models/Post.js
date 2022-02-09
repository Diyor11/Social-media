const mongoose = require('mongoose')
const Joi = require('joi')

const commentScheme = new mongoose.Schema({
    text: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

const Post = mongoose.model('Posts', mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    createrImg: {
        type: String
    },
    createrName: {
        type: String
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
    },
    comments: {
        type: [commentScheme],
        default: []
    }
}, { timestamps: true }))

const postValidater = Joi.object({
    userId: Joi.string(),
    desc: Joi.string().max(500),
    img: Joi.string(),
    createrImg: Joi.string().min(100),
    createrName: Joi.string().min(3).max(50)
})

const commentValidater = Joi.object({
    text: Joi.string().required()
})

module.exports = { Post, postValidater, commentValidater }