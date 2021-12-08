const express = require('express')
const api = require('./api')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, limit: 10000000}))

require('dotenv').config()
const port = process.env.APP_PORT

app.get('/', (req, res) => {
  res.send({
    status: 'online',
  })
})

app.use('/api/v1', api)
app.listen(port, () => console.log(`server running on port ${port}`))