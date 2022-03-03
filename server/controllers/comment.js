const { Comment, commentValidater } = require('../models/Comment')
const { Post } = require('../models/Post')

// --------------------------------- add comment ---------------------------------
module.exports.addComment = async(req, res) => {
    const {value, error} = commentValidater.validate(req.body)

    if(error) return res.status(400).send({error: error.details[0].message})
    const comment = await Comment({text: value.text, postId: req.params.id, creater: req.userId, createdAt: Date()}).save()
    if(!comment) {
        console.log('Error saving comment')
        return res.status(500).send({error: 'Comment not saved'})
    }

    const post = await Post.findByIdAndUpdate(req.params.id, {
        $push: {
            comments: comment._id
        }
    }, {new: true}).select('comments')

    if(!post) return res.send({error: 'this posts not found'}) 
    res.send(comment)
}
// --------------------------------- delete comment ---------------------------------
module.exports.deleteComment = async(req, res) => {
    const comment = await Comment.findById(req.params.id).select('postId creater')
    if(!comment) return res.status(404).send({error: 'This comment not found'})
    if(comment.creater == req.userId){
        const post = await Post.findByIdAndUpdate(comment.postId, {$pull: {comments: comment._id}}, {new: true})
        if(!post) return res.status(404).send({error: 'This post not found'})
        await comment.deleteOne().catch(e => console.log('Error deleting comment'))
        res.send(comment)
    } else {
        res.status(403).send({error: 'You can delete only your own comments'})
    }
}
// --------------------------------- update comment ---------------------------------
module.exports.updateComment = async(req, res) => {
    const {error, value} = commentValidater.validate(req.body)
    if(error) return res.send({error: error.details[0].message})
    const comment = await Comment.findById(req.params.id).select('creater')
    if(!comment) return res.status(404).send({error: 'Comment not found'})
    if(req.userId == comment.creater){
        await comment.updateOne(value)  
        res.send({...comment._doc, text: value.text})
    }  else {
        res.status(403).send({error: 'You can update only your own comment'})
    }
}
// --------------------------------- get post comments ---------------------------------
module.exports.getPostComments = async(req, res) => {
    const comments = await Comment.find({postId: req.params.id}).populate('creater', 'username profilePicture').select('-__v')
    res.send(comments)
}
