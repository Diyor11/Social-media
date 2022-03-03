const { Message, messageValidater } = require('../models/Message')
const { User } = require('../models/User')
const validId = require('../utils/validUserId')

module.exports.addMessage = async(req, res) => {
    const {error, value} = messageValidater.validate(req.body)

    if(error) return res.send({error: error.details[0].message})
    if(!validId(value.reciver)) return res.status(400).send({error: 'Invalid credentionals'})
    if(req.userId === value.reciver) return res.status(400).send({error: 'You can\'t send message yourself'})

    const users = await User.find({$or: [{_id: req.userId}, {_id: value.reciver}]}).select('_id')

    if(users.length !== 2) return res.status(404).send({error: 'Sender or reciver not found'}) 

    const msg = await Message({...value, sender: req.userId, createdAt: Date.now()}).save()
    
    if(msg)
        res.status(201).send(msg)
    else{
        console.log('Error message not saved')
        res.status(500).send({error: 'message not saved'})
    }
}
// ----------------- > Conversetion messages ---------------- -- -- ---
module.exports.messages = async(req, res) => {
    if(req.userId === req.params.id) return res.status(400).send({error: 'Invalid credentionals'})    

    const messages = await Message.find({$or: [
        {
            $and: [
                {sender: req.userId},
                {reciver: req.params.id}
            ]
        },
        {
            $and: [
                {sender: req.params.id},
                {reciver: req.userId}
            ]
        }
    ]}).sort({createdAt: 1})

    res.send(messages)
}