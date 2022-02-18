const validUserId = require('../utils/validUserId')
const {User, userUpdateValidater, userSignInValidater} = require('../models/User')
const {Post} = require('../models/Post')
const bcrypt = require('bcrypt')

// --------------- update user ------------------
module.exports.updateUser = async(req, res) => {
    const {error, value} = userUpdateValidater.validate(req.body)
    
    if(error) return res.send({error: error.details[0].message})
    if(value.info?.relationShip && !['single', 'married'].includes(value.relationShip.toLowerCase())) return res.status(400).send({error: 'Relitionship must be single or married'})
    const currentUser = await User.findById(req.params.id)
    if(!currentUser) return res.send({error: 'User not found'})
        
    if(req.params.id === req.userId){
        if(value.password)
            value.password = await bcrypt.hash(value.password, 10)
            const updatedUser = await currentUser.set({profilePicture: value.profilePicture, info: {...currentUser.info, ...value.info}}).save()
        if(!updatedUser) return res.send({error: 'User not found'})
        const {password, friends, posts, ...filterdUser} = updatedUser._doc
        res.send(filterdUser)
    } else {
        res.send({error: 'You can update only your acc'})
    }
}
// --------------- delete user --------
module.exports.deleteUser = async(req, res) => {
    const {error, value} = userSignInValidater.validate(req.body)
    if(error) return res.send({error: error.details[0].message})

    if(req.userId === req.params.id){
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if(!deletedUser) return res.send({error: 'User not found'})
        const {username, _id, email, ...filterdUser} = deletedUser._doc
        res.send({username, _id, email})
        const userPosts = await Post.find({creater: deletedUser._id})
        userPosts.forEach(async(e) => {
            await e.deleteOne()
        })
        await User.updateMany({friends: deletedUser._id}, {
            $pull: {
                friends: deletedUser._id
            }
        })
    }else{
        res.status(403).send({error: 'You can delete only your acc'})
    }
}
// --------------- get a user by id ------ ->
module.exports.getAllUsers = async(req, res) => {
    const validProperys = ['username', 'email', 'profilePicture']
    if(req.query?.select){
        const query = req.query.select.split(' ')
        const validQuerys = query.filter(st => validProperys.includes(st))
        if(validQuerys.length){
            const users = await User.find().select(validQuerys.join(' '))
            res.send(users)
        } else {
            res.status(400).send({error: 'please select valid propertys'})
        }
    } else {
        res.status(400).send({error: 'Select query string is required'})
    }
}
// --------------- get a user by id ------ ->
module.exports.getUser = async(req, res) => {
    const user = await User.findById(req.params.id).select('-password').populate('friends', 'profilePicture username')
    if(!user) return res.send({error: 'this user not found'})
    const posts = await Post.find({userId: req.params.id}).sort({createdAt: 1}).select({__v: 0, updatedAt: 0})
    // const friendId = [...user.followers, ...user.followings]
    // let friends = []
    // if(friendId?.length){
    //     friends = await Promise.all(friendId.map(id => User.findById(id).select({profilePicture: 1, username: 1})))
    // }
    res.send({...user._doc, posts})
}
// --------------- follow a user --------->
module.exports.addFriend = async(req, res) => {
    const user = await User.findById(req.params.id).select('friends')
    const currentUser = await User.findById(req.userId).select('friends')

    if(!currentUser) return res.send({error: 'your user id not found ' + req.userId})
    if(!user) return res.send({error: 'User not found this id'})

    if (req.userId !== req.params.id) {
        if(!user.friends.includes(req.userId)){
            await user.updateOne({$push: {friends: req.userId}})
            await currentUser.updateOne({$push: {friends: req.params.id}})
            res.send({success: 'Added new friend', _id: user._id})
        } else {
            return res.send({error: 'You already have this friend'})
        }
    } else {
        return res.send({error: 'You cant add friend yourself'})
    }
}
// --------------- unfollow a user --------->
module.exports.removeFriend = async(req, res) => {
    const user = await User.findById(req.params.id).select('friends')
    const currentUser = await User.findById(req.userId).select('friends')

    if(!currentUser) return res.send({error: 'your userid not found ' + req.userId})

    if(user && user.friends.includes(req.userId)){
        await user.updateOne({$pull: {friends: req.userId}})
        await currentUser.updateOne({$pull: {friends: req.params.id}})
        return res.send({success: 'This user succes deleed friends', _id: user._id})
    } else if(user){
        return res.send({error: 'You did\'n follow this user'})
    } else {
        return res.send({success: 'This acc not found'})
    }
}
// --------------- get user avatar image --------->
module.exports.getAvatar = async(req, res) => {
    const data = await User.findById(req.userId).select({profilePicture: 1, followings: 1, followers: 1, _id: 0})
    res.send(data)
}
