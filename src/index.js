const express = require('express')
const api = require('./api')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config({ path: '../.env'  })
  
app.use(cors(
  { origin: [ 'http://localhost:3000', 'https://d.buzz', 'https://next.d.buzz', 'http://localhost:2020' ] }
))

// app.use(cors('*'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, limit: 10000000}))

const port = process.env.APP_PORT

app.get('/', (req, res) => {
  res.send({
    status: 'online',
  })
})

app.use('/api/v1', api)
app.listen(port, () => console.log(`server running on port ${port}`))
