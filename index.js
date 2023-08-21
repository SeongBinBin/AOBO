var express = require('express')
var app = express()
var logger = require('morgan')
var mongoose = require('mongoose')
var usersRouter = require('./src/routes/users')
var config = require('./config')

mongoose.connect(config.MONGODB_URL)
.then(() => console.log('MONGODB CONNECTED ... '))
.catch(e => console.log(`FAILED TO CONNECT MONGODB: ${e}`))

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
app.listen(5000, () => {
    console.log('Server Is Running On Port 5000')
})