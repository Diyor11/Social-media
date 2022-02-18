const mongoose = require('mongoose')

const Notification = mongoose.model('notifications', mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    notifications: [{
        author: String,
        text: String
    }]
}))

module.exports = Notification