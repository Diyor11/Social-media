const router = require('express').Router()
const validId = require('../middlewares/validId')
const authConfirm = require('../middlewares/auth')
const { updateUser, deleteUser, getUser, followUser, unfollowUser, getAllUsers } = require('../controllers/user')

router.put('/:id', [validId, authConfirm], updateUser)
router.delete('/:id', [validId, authConfirm], deleteUser)
router.get('/:id', [validId], getUser)
router.get('/', getAllUsers)
router.patch('/follow/:id', [validId, authConfirm], followUser)
router.patch('/unfollow/:id', [validId, authConfirm], unfollowUser)

module.exports = router