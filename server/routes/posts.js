const router = require('express').Router()
const validId = require('../middlewares/validId')
const authConfirm = require('../middlewares/auth')
const { createPost, updatePost, deletePost, likePost, getPost, getAllPost, getUserPosts } = require('../controllers/post')

router.post('/', [authConfirm], createPost)
router.put('/:id', [validId, authConfirm], updatePost)
router.delete('/:id', [validId, authConfirm], deletePost)
router.patch('/like/:id', [validId, authConfirm], likePost)
router.get('/:id', [validId], getPost)
router.get('/allposts/:id', [validId], getAllPost)
router.get('/userposts/:id', [validId], getUserPosts)

module.exports = router