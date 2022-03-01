const { Post,  postValidater } = require('../models/Post')
const { Comment, commentValidater } = require('../models/Comment')
const { User } = require('../models/User')

// ---------------------------------< create a post >---------------------------------=-=-=-=-=-/\/\/\>>>>
module.exports.createPost = async(req, res) => {
    const { error, value } = postValidater.validate(req.body)

    if(error) return res.send({error: error.details[0].message})
    const exitUser = await User.findById(req.userId).select('_id')

    if(!exitUser) return res.status(400).send({error: 'this user not found ' + req.userId})

    const createdPost = await new Post({...value, creater: req.userId, createdAt: Date()}).save()
    res.send(createdPost)
    await User.updateOne({_id: req.userId}, {$push: {posts: createdPost._id}}, {new: true})
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
        await User.updateOne({_id: req.userId}, {$pull: {posts: post._id}}, {new: true})
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
// --------------------------------- get all posts ---------------------------------
module.exports.getAllPost = async(req, res) => {
    const currentUser = await User.findById(req.userId)
    if(!currentUser) return res.send({error: 'User not found'})

    const userPosts = await Post.find({creater: currentUser._id}).sort({createdAt: -1}).select({__v: 0}).limit(10).populate('creater', 'username profilePicture')

    let friendPosts  = await Promise.all(currentUser.friends.map(id => {
         return Post.find({creater: id}).populate('creater', 'username profilePicture').sort({createdAt: -1})
    }))


    friendPosts.filter(obb => isNaN(obb) || obb !== undefined).forEach(posts => {
        let arr = []
        if(Array.isArray(posts))
            posts.forEach(post => arr.push(post))
        arr.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
        friendPosts = arr
    })
    res.send(userPosts.concat(friendPosts))
}
