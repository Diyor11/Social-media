const router = require('express').Router()
const validId = require('../middlewares/validId')
const authConfirm = require('../middlewares/auth')
const { updateUser, deleteUser, getUser, addFriend, removeFriend, getAllUsers, getAvatar } = require('../controllers/user')

router.put('/:id', [validId, authConfirm], updateUser)
router.delete('/:id', [validId, authConfirm], deleteUser)
router.get('/:id', [validId], getUser)
router.get('/', getAllUsers)
router.patch('/addfriend/:id', [validId, authConfirm], addFriend)
router.patch('/removefriend/:id', [validId, authConfirm], removeFriend)
router.get('/image/avatar', [authConfirm], getAvatar)

module.exports = router