const bcrypt = require('bcrypt')
const {User, userSignUpValidater, userSignInValidater} = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports.signUp = async(req, res) => {
    const { error, value } = userSignUpValidater.validate(req.body)
    if(error) return res.send({error: error.details[0].message})

    const emailExist = await User.findOne({email: value.email})

    if(emailExist) return res.send({error: 'This email already exist'})

    const hashedPassword = await bcrypt.hash(value.password, 10)

    const newUser = await new User({...value, password: hashedPassword}).save()
    const {password, updatedAt, ...filterdUser} = newUser._doc
    res.status(201).send(filterdUser)
}

module.exports.signIn = async(req, res) => {
    const {error, value} = userSignInValidater.validate(req.body)

    if(error) return res.send({error: error.details[0].message})

    const existEmail = await User.findOne({email: value.email})
    if(!existEmail) return res.send({error: 'This email not found'})

    const validatePassword = await bcrypt.compare(value.password, existEmail.password)
    if(!validatePassword) return res.send({error: 'Invalid password or email'})

    const {email, _id, username} = existEmail._doc
    const token = jwt.sign({email, _id}, process.env.JWT_KEY)
    res.send({user: {email, _id, username}, token})
}