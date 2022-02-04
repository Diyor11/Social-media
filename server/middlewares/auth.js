const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token)
        return res.status(403).send({error: 'Token ton found'})

    const isCustomToken = token.length < 300
    let decodeData
    try {
        if(isCustomToken){
            decodeData = jwt.verify(token, process.env.JWT_KEY)
        } else {
            decodeData = jwt.decode(token)
        }
    } catch (error) {
        return res.status(403).send({error: 'invalid token'})
    }

    req.userId = decodeData?._id
    console.log(req.userId)

    if(!mongoose.Types.ObjectId.isValid(req.userId))
        return res.status(400).send({error: 'invalid token'})
    next()
}