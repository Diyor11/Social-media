const router = require('express').Router()
const validId = require('../middlewares/validId')
const authConfirm = require('../middlewares/auth')
const userIdValid = require('../middlewares/userIdValid')
const { updateUser, deleteUser, getUser, followUser, unfollowUser, getAllUsers } = require('../controllers/user')

router.put('/:id', [validId, authConfirm, userIdValid], updateUser)
router.delete('/:id', [validId, authConfirm, userIdValid], deleteUser)
router.get('/:id', [validId], getUser)
router.get('/', getAllUsers)
router.patch('/follow/:id', [validId, authConfirm, userIdValid], followUser)
router.patch('/unfollow/:id', [validId, authConfirm, userIdValid], unfollowUser)

module.exports = router