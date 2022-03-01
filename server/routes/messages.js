const router = require('express').Router()
const { addMessage, messages } = require('../controllers/messages')
const authConfirm = require('../middlewares/auth')
const validId = require('../middlewares/validId')

router.post('/add', [authConfirm], addMessage)

router.get('/:id', [validId, authConfirm], messages)

module.exports = router 