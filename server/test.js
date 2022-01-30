const {User} = require('./models/User')
const router = require('express').Router()

module.exports = router.get('/', async(req, res) => {
    const posts = await User.find().or([{followers: "61cb15c6838efab84f2d34e7"}, {followings: "61cb15c6838efab84f2d34e7"}])
    res.send(posts)
})
