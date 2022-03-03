const express = require('express')
const app = express()

require('dotenv').config()
require('./db')()

// app.set('view engine', 'ejs')

app.use(express.json({limit: '30mb', extended: true}))
app.use(require('helmet')())
app.use(require('cors')())
// app.use(require('morgan')('common'))
app.use(require('compression')())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/message', require('./routes/messages'))

const port = process.env.PORT || 5000
app.listen(port, () => console.log('Server working localhost:' + port))