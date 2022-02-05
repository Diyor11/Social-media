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

const fetch = async() => {
    try {
        const data = await Post.find()
        const data1 = await User.find()
        await console.log(data, data1)
    } catch (error) {
        console.log('error')
    }
}

fetch()

// User.findOne({_id: '61faab94bec4f4ef4f828585'})
//     .then(res => console.log(res))
//     .catch(e => console.log('Topilmadi'))

