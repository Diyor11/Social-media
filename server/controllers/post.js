const { Post,  postValidater, commentValidater } = require('../models/Post')
const { User } = require('../models/User')
// const validUserId = require('../utils/validUserId')

// ---------------------------------< create a post >---------------------------------=-=-=-=-=-/\/\/\>>>>
module.exports.createPost = async(req, res) => {
    const { error, value } = postValidater.validate(req.body)

    if(error) return res.send({error: error.details[0].message})
    const exitUser = await User.findById(req.userId).select('_id')

    if(!exitUser) return res.status(400).send({error: 'this user not found ' + req.userId})

    const createdPost = await new Post({...value, creater: req.userId}).save()
    res.send(createdPost)
}
// --------------------------------- update a post ---------------------------------
module.exports.updatePost = async(req, res) => {
    const {error, value} = postValidater.validate(req.body)

    if(error) return res.send({error: error.details[0].message})

    const getPost = await Post.findById(req.params.id).select('creater')
    if(!getPost) return res.send({error: 'This post not found'})

    if(getPost.creater == req.userId){
        await getPost.updateOne({$set: value})
        res.send({success: 'Post success updated'})
    } else {
        res.send({error: 'You can update onlt your own posts'})
    }
}
// --------------------------------- delete a post ---------------------------------
module.exports.deletePost = async(req, res) => {

    const post = await Post.findById(req.params.id)
    if(!post) return res.send({error: 'This post not found'})
    if(post.creater == req.userId){
        await post.deleteOne()
        res.send({success: 'post succes deleted', _id: post._id})
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
// module.exports.getPost = async(req, res) => {
//     const post = await Post.findById(req.params.id).select({__v: 0})

//     if(!post) return res.send({error: 'Post not found'})
//     res.send(post)
// }
// --------------------------------- get all posts ---------------------------------
module.exports.getAllPost = async(req, res) => {
    const currentUser = await User.findById(req.userId)
    if(!currentUser) return res.send({error: 'User not found'})

    const userPosts = await Post.find({creater: currentUser._id}).sort({createdAt: 1}).select({__v: 0}).limit(10).populate('creater', 'username profilePicture')

    let friendPosts  = await Promise.all(currentUser.friends.map(id => {
        Post.find({userId: id}).populate('creater', 'username profilePicture')
    }))
    friendPosts.filter(obb => isNaN(obb)).forEach(posts => {
        let arr = []
        posts.forEach(post => arr.push(post))
        arr.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
        friendPosts = arr
    })
    res.send(userPosts.concat(friendPosts))
}
// --------------------------------- get my posts ---------------------------------
// module.exports.getUserPosts = async(req, res) => {
//     const currentUser = await User.findById(req.params.id)
//     if(!currentUser) return res.send({error: 'User not found'})

//     const userPosts = await Post.find({userId: currentUser._id}).sort({createdAt: 1}).select({__v: 0})
//     res.send(userPosts)
// }

module.exports.addComment = async(req, res) => {
    const {value, error} = commentValidater.validate(req.body)

    if(error) return res.status(400).send({error: error.details[0].message})
    const post = await Post.findOneAndUpdate({_id: req.params.id}, {
        $push: {
            comments: {text: value.text, author: req.userId}
        }
    }, {new: true})

    if(!post) return res.send({error: 'this posts not found'}) 
    console.log(post)
    res.send(post)
}
