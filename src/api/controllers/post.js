require('dotenv').config()
const fleekStorage = require('@fleekhq/fleek-storage-js')

const apiKey = process.env.API_KEY
const apiSecret = process.env.API_SECRET

const post = async(username, userData) => {

	const users = {
		apiKey,
		apiSecret,
		key: `/dbuzz-d-database/${username}.json`,
		data: JSON.stringify(userData),
	}

	return await fleekStorage.upload(users)	

}

module.exports = post