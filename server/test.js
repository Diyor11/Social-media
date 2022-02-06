const {User} = require('./models/User')
const router = require('express').Router()
module.exports = router.get('/', async(req, res) => {
    const posts = await User.find({_id: {$ne: '61faab94bec4f4ef4f828585'}})
    res.send(posts)
})

// const jwt = require('jsonwebtoken')

// const res = jwt

// User.findOne({_id: '61faab94bec4f4ef4f828585'})
//     .then(res => console.log(res))
//     .catch(e => console.log('Topilmadi'))

