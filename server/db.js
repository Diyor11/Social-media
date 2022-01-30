const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
        .then(() => console.log('Mongodb connect...'))
        .catch(e => console.log('Mongodb connect error !!!'))
}