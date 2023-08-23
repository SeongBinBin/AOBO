var express = require('express')
var app = express()
var logger = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose')
var usersRouter = require('./src/routes/users')
require('dotenv').config()

// var config = require('./config')

var corsOptions = {
    origin: '*',
    credentials: true
}

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('MONGODB CONNECTED ...')

})
.catch(err => {
    console.log(err)
})

app.use(cors(corsOptions))
app.use(express.json())
app.use(logger('tiny'))

app.use('/api/users', usersRouter)

app.use((req, res, next) => {
    res.status(404).send("Page Not Found")
})
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("Internal Server Error")
})
app.listen(process.env.SERVER_PORT, () => {
    console.log('Server Is Running On Port ' + process.env.SERVER_PORT)
})