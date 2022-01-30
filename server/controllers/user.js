const validUserId = require('../utils/validUserId')
const {User, userUpdateValidater} = require('../models/User')
const {Post} = require('../models/Post')
const bcrypt = require('bcrypt')

// --------------- update user ------------------
module.exports.updateUser = async(req, res) => {
    const {error, value} = userUpdateValidater.validate(req.body)
    
    if(error) return res.send({error: error.details[0].message})
    if(!['single', 'married'].includes(value.relationShip.toLowerCase())) return res.status(400).send({error: 'Relitionship must be single or married'})
    if(!validUserId(value.userId)) return res.send({error: 'userId is not valid'})
    const currentUser = await User.findById(req.params.id)
    if(!currentUser) return res.send({error: 'User not found'})
        
    if(currentUser.isAdmin || req.params.id === value.userId){
        if(value.password)
            value.password = await bcrypt.hash(value.password, 10)
        const updatedUser = await currentUser.set(value).save()
        if(!updatedUser) return res.send({error: 'User not found'})
        const {password, updatedAt, ...filterdUser} = updatedUser._doc
        res.send(filterdUser)
    } else {
        res.send({error: 'You can update only your acc'})
    }
}
// --------------- delete user --------
module.exports.deleteUser = async(req, res) => {
    const {error, value} = userUpdateValidater.validate(req.body)
    if(error) return res.send({error: error.details[0].message})

    if(value.isAdmin || value.userId === req.params.id){
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if(!deletedUser) return res.send({error: 'User not found'})
        const {password, updatedAt, ...filterdUser} = deletedUser._doc
        res.send(filterdUser)
        const userPosts = await Post.find({userId: deletedUser._id})
        userPosts.forEach(async(e) => {
            await e.deleteOne()
        })
        const friends = await User.find().or([{followers: deletedUser._id}, {followings: deletedUser._id}])
        friends.forEach(async(e) => {
            if(e.followers.includes(deletedUser._id)){
                await e.updateOne({$pull: {followers: deletedUser._id}})
            } else {
                await e.updateOne({$pull: {followings: deletedUser._id}})
            }
        })
    }else{
        res.status(403).send({error: 'You can delete only your acc'})
    }
}
// --------------- get a user by id ------ ->
module.exports.getAllUsers = async(req, res) => {
    const users = await User.find()
    res.send(users)
}
// --------------- get a user by id ------ ->
module.exports.getUser = async(req, res) => {
    const user = await User.findById(req.params.id)
    if(!user) return res.send({error: 'this user not found'})
    const {password, updatedAt, ...filterdUser} = user._doc
    res.send(filterdUser)
}
// --------------- follow a user --------->
module.exports.followUser = async(req, res) => {
   
    if(!req.body.userId) return res.send({error: 'userId required'})
    if(!validUserId(req.body.userId)) return res.send({error: 'Invalid userId'})

    const user = await User.findById(req.params.id)
    const currentUser = await User.findById(req.body.userId)

    if(!currentUser) return res.send({error: 'your userid not found ' + req.body.userId})
    if(!user) return res.send({error: 'User not found this id'})

    if (req.body.userId !== req.params.id) {
        if(!user.followers.includes(req.body.userId)){
            await user.updateOne({followers: [...user.followers, req.body.userId]})
            await currentUser.updateOne({followings: [...currentUser.followings, req.params.id]})
            res.send({success: 'You success follow'})
        } else {
            return res.send({error: 'You alreacy follow this acc'})
        }
    } else {
        return res.send({error: 'You cant follow yourself'})
    }
}
// --------------- unfollow a user --------->
module.exports.unfollowUser = async(req, res) => {

    if(!req.body.userId) return res.send({error: 'userId required'})
    if(!validUserId(req.body.userId)) return res.send({error: 'Invalid userId'}) 

    const user = await User.findById(req.params.id)
    const currentUser = await User.findById(req.body.userId)

    if(!currentUser) return res.send({error: 'your userid not found ' + req.body.userId})

    if(user && user.followers.includes(req.body.userId)){
        await user.updateOne({followers: user.followers.filter(e => e !== req.body.userId)})
        await currentUser.updateOne({followings: currentUser.followings.filter(e => e !== req.params.id)})
        return res.send({success: 'You success unfollow'})
    } else if(user){
        return res.send({error: 'You did\'n follow this user'})
    } else {
        await currentUser.updateOne({followings: currentUser.followings.filter(e => e !== req.params.id)})
        return res.send({success: 'This acc already deleted you success unfollow'})
    }
}