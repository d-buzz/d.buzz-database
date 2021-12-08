const { Router } =  require('express')
const post = require('../controllers/post')

const postRouter = Router()

postRouter.post('/', function (req, res) {

	const { username, userData } = req.body

  post(username, userData).then(() => {
		res.send(req.body)
	})
})

module.exports = postRouter