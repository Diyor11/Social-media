const router = require('express').Router()
const validId = require('../middlewares/validId')
const authConfirm = require('../middlewares/auth')
const userIdValid = require('../middlewares/userIdValid')
const { createPost, updatePost, deletePost, likePost, getPost, getAllPost } = require('../controllers/post')

router.post('/', [authConfirm, userIdValid], createPost)
router.put('/:id', [validId, authConfirm, userIdValid], updatePost)
router.delete('/:id', [validId, authConfirm, userIdValid], deletePost)
router.patch('/like/:id', [validId, authConfirm, userIdValid], likePost)
router.get('/:id', [validId], getPost)
router.get('/allposts/:id', [validId], getAllPost)
router.get('/myposts/:id', [validId], getAllPost)

module.exports = router