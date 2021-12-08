require('dotenv').config()
const { default: axios } = require('axios')

const get = async(user) => {
  const dbRef = `${process.env.DB_REF_URL}/${user}.json`

  return await axios.get(dbRef)
}

module.exports = get