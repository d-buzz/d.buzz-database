const { Router } =  require('express')
const post = require('../controllers/post')

const postRouter = Router()

postRouter.post('/', function (req, res) {

	const { auth } = req.headers
	const { username, userData } = req.body

  if(auth === process.env.AUTH_KEY) {
		post(username, userData).then(() => {
			res.send(req.body)
		})
	} else {
		res.send('Unauthorized request')
	}

})

module.exports = postRouter