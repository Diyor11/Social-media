const router = require('express').Router()
const validId = require('../middlewares/validId')
const authConfirm = require('../middlewares/auth')
const { createPost, updatePost, deletePost, likePost, getAllPost } = require('../controllers/post')
const { addComment, getPostComments, updateComment, deleteComment } = require('../controllers/comment')

router.get('/all/posts', [authConfirm], getAllPost)
router.post('/create', [authConfirm], createPost)
router.put('/update/:id', [validId, authConfirm], updatePost)
router.patch('/like/:id', [validId, authConfirm], likePost)
router.delete('/:id', [validId, authConfirm], deletePost)

router.get('/all/comments/:id', [validId], getPostComments)
router.delete('/comment/:id', [validId, authConfirm], deleteComment)
router.put('/comment/:id', [validId, authConfirm], updateComment)
router.post('/comment/:id', [validId ,authConfirm], addComment)

module.exports = router