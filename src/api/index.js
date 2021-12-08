const { json } = require('express')
const express = require('express')
const getRouter = require('./routes/getRouter')
const postRouter = require('./routes/postRouter')
const api = express()

api.use('/database/get', getRouter)
api.use('/database/post', postRouter)

module.exports = api