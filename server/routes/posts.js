const router = require('express').Router()
const validId = require('../middlewares/validId')
const authConfirm = require('../middlewares/auth')
const { createPost, updatePost, deletePost, likePost, getPost, getAllPost, getUserPosts, addComment, getPostComments, updateComment, deleteComment } = require('../controllers/post')

router.post('/create', [authConfirm], createPost)
router.post('/comment/:id', [validId ,authConfirm], addComment)
router.put('/comment/:id', [validId, authConfirm], updateComment)
router.delete('/comment/:id', [validId, authConfirm], deleteComment)
router.put('/update/:id', [validId, authConfirm], updatePost)
router.delete('/:id', [validId, authConfirm], deletePost)
router.patch('/like/:id', [validId, authConfirm], likePost)
router.get('/all/posts', [authConfirm], getAllPost)
router.get('/all/comments/:id', [validId], getPostComments)
// router.get('/:id', [validId], getPost)
// router.get('/userposts/:id', [validId], getUserPosts)

module.exports = router