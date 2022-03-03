const bcrypt = require('bcrypt')
const {User, userSignUpValidater, userSignInValidater} = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports.signUp = async(req, res) => {
    const { error, value } = userSignUpValidater.validate(req.body)
    if(error) return res.send({error: error.details[0].message})

    const emailExist = await User.findOne({email: value.email}).select('_id')
    if(emailExist) return res.send({error: 'This user Allready exist'})

    const hashedPassword = await bcrypt.hash(value.password, 10)
    
    if(hashedPassword){
        const newUser = await User({...value, password: hashedPassword}).save()
        if(newUser)
            res.status(201).send({success: 'You succes sign up'})
        else {
            console.log('Error saving new user auth/20')
            res.status(500).send({error: 'Error saving new user'})
        }
    } else {
        console.log('Error generation bcrypt password')
        res.status(500).send({error: 'Error generation bcrypt password'})
    }

    // if(emailExist && emailExist.verifield){
    //     res.send({error: 'This user alredy exist'})
    // } else if(emailExist){
    //     const userValid = await VerifyUser.findOne({userId: emailExist._id})
    //     if(userValid && userValid.expiresAt > Date.now()){
    //         res.send({code: 1, message: 'Allready sended'})
    //     } else if(userValid && userValid.expiresAt < Date.now()){
    //         await VerifyUser.deleteOne(userValid).catch(e => console.log('Error delete expired verify doc'))
    //         sendVerify(emailExist, res)
    //     } else{
    //         sendVerify(emailExist, res)
    //     }
    // } else {    
    //     const hashedPassword = await bcrypt.hash(value.password, 10)
    //     if(hashedPassword){
    //         const newUser = await User({...value, password: hashedPassword}).save()
    //         if(newUser) {
    //             sendVerify(newUser._doc, res)
    //         } else {
    //             console.log('Error saving new user')
    //             res.send({error: 'Error saving new user'})
    //         }
    //     } else {
    //         console.log('Error generation bcrypt password')
    //         res.status(500).send({error: 'Error generation bcrypt password'})
    //     }
    // }
}

module.exports.signIn = async(req, res) => {
    const {error, value} = userSignInValidater.validate(req.body)
    if(error) return res.send({error: error.details[0].message})

    const existEmail = await User.findOne({email: value.email})
    if(!existEmail) return res.send({error: 'This email not found'})

    // if(!existEmail.verifield) return res.send({error: 'Email not verifield please check your email or re signup'})

    const validatePassword = await bcrypt.compare(value.password, existEmail.password)
    if(!validatePassword) return res.send({error: 'Invalid password or email'})

    const {email, _id, username, from, city} = existEmail._doc
    const token = jwt.sign({email, _id}, process.env.JWT_KEY)
    res.send({user: {email, _id, username, from, city}, token})
}








