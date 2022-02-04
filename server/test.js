// const {User} = require('./models/User')
// const router = require('express').Router()
// module.exports = router.get('/', async(req, res) => {
//     const posts = await User.find().or([{followers: "61cb15c6838efab84f2d34e7"}, {followings: "61cb15c6838efab84f2d34e7"}])
//     res.send(posts)
// })

// const jwt = require('jsonwebtoken')

// const res = jwt
const {Post} = require('./models/Post')
const {User} = require('./models/User')

;(async() => {
    const post = await Post.findById('61facbfeb15abe07e87a9f5f')
    console.log(post)
})()

// User.findOne({_id: '61faab94bec4f4ef4f828585'})
//     .then(res => console.log(res))
//     .catch(e => console.log('Topilmadi'))

