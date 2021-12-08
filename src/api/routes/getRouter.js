const { Router } =  require('express')
const get = require('../controllers/get')

const getRouter = Router()

getRouter.get('/', function (req, res) {

	const username = req.query.username

  if(username) {
		get(username)
		.then(response => {
			res.send(response.data)
		})
		.catch(err => {
			if(err.message === 'Request failed with status code 404') {
				res.send('User not found')
			}
		})
	} else {
		res.send('Invalid request')
	}
})

module.exports = getRouter