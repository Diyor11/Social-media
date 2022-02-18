const router = require('express').Router()
const validId = require('../middlewares/validId')
const authConfirm = require('../middlewares/auth')
const { createPost, updatePost, deletePost, likePost, getPost, getAllPost, getUserPosts, addComment } = require('../controllers/post')

router.post('/create', [authConfirm], createPost)
router.post('/comment/:id', [validId ,authConfirm], addComment)
router.put('/update/:id', [validId, authConfirm], updatePost)
router.delete('/:id', [validId, authConfirm], deletePost)
router.patch('/like/:id', [validId, authConfirm], likePost)
// router.get('/:id', [validId], getPost)
router.get('/all/posts', [authConfirm], getAllPost)
// router.get('/userposts/:id', [validId], getUserPosts)

module.exports = router