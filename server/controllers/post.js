const { Post,  postValidater } = require('../models/Post')
const { User } = require('../models/User')
const validUserId = require('../utils/validUserId')

// ---------------------------------< create a post >---------------------------------=-=-=-=-=-/\/\/\>>>>
module.exports.createPost = async(req, res) => {
    const { error, value } = postValidater.validate(req.body)

    if(error) return res.send({error: error.details[0].message})
    const exitUser = await User.findById(value.userId)

    if(!exitUser) return res.status(400).send({error: 'this user not found ' + value.userId})

    const createdPost = await new Post(value).save()
    res.send(createdPost)
}
// --------------------------------- update a post ---------------------------------
module.exports.updatePost = async(req, res) => {
    const {error, value} = postValidater.validate(req.body)

    if(error) return res.send({error: error.details[0].message})

    const getPost = await Post.findById(req.params.id)
    if(!getPost) return res.send({error: 'This post not found'})

    if(getPost.userId === value.userId){
        await getPost.updateOne({$set: req.body})
        res.send({success: 'Post success updated'})
    } else {
        res.send({error: 'You can update onlt your own posts'})
    }
}
// --------------------------------- delete a post ---------------------------------
module.exports.deletePost = async(req, res) => {

    const post = await Post.findById(req.params.id)
    if(!post) return res.send({error: 'This post not found'})
    if(post.userId === req.userId){
        const deletedPost = await post.deleteOne()
        res.send(deletedPost)
    } else {
        res.send({error: 'You can delete only your own posts'})
    }
}
// --------------------------------- like and distlike a post ---------------------------------
module.exports.likePost = async(req, res) => {

    const post = await Post.findById(req.params.id)
    if(!post) return res.send({error: 'This post not found'})

    if(post.likes.includes(req.userId)){
        await post.updateOne({$pull: {likes: req.userId}})
        res.send({success: 'Post success distliked'})
    } else {
        await post.updateOne({$push: {likes: req.userId}})
        res.send({success: 'Post success liked'})
    }
}
// --------------------------------- get a post by id ---------------------------------
module.exports.getPost = async(req, res) => {
    const post = await Post.findById(req.params.id).select({__v: 0})

    if(!post) return res.send({error: 'Post not found'})
    res.send(post)
}
// --------------------------------- get all posts ---------------------------------
module.exports.getAllPost = async(req, res) => {
    const currentUser = await User.findById(req.params.id)
    if(!currentUser) return res.send({error: 'User not found'})

    const userPosts = await Post.find({userId: currentUser._id}).sort({createdAt: 1}).select({__v: 0})
    const friendPosts  = await Promise.all(currentUser.followings.map(id => Post.find({userId: id})))

    res.send(userPosts.concat(friendPosts))
}
// --------------------------------- get my posts ---------------------------------
module.exports.getUserPosts = async(req, res) => {
    const currentUser = await User.findById(req.params.id)
    if(!currentUser) return res.send({error: 'User not found'})

    const userPosts = await Post.find({userId: currentUser._id}).sort({createdAt: 1}).select({__v: 0})
    res.send(userPosts)
}