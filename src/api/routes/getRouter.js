const { Router } =  require('express')
const get = require('../controllers/get')

const getRouter = Router()

getRouter.get('/', function (req, res) {

	const { auth } = req.headers
	const username = req.query.username

	if(auth === process.env.AUTH_KEY) {
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
	} else {
		res.send('Unauthorized request')
	}
})

getRouter.get('/getLeaderboardEngagement', async function (req, res) {

	const hivesql_config = {
		user: 'Hive-k3mpz',
		password: 'kZSPP448F4AkHTL4HbN4',
		server: 'vip.hivesql.io', 
		database: 'DBHive',
		options: {
		  enableArithAbort: true,
		  encrypt: true,
		  trustServerCertificate: true,
		},
	}
	const mssql = require("mssql")
    const {sort, date_type} = req.query
    let date_filter = ''
    if(date_type === 'all_time'){
      date_filter = ''
    }else if(date_type === 'weekly'){
      date_filter = " AND DATEPART(WK, c.created) = DATEPART(WK, GETDATE()) AND DATEPART(YEAR, c.created) = DATEPART(YEAR, GETDATE())"
    }else{
      date_filter =  " AND CONVERT(DATE, c.created) = CONVERT(DATE, GETDATE())"
    }
    let sort_by = ' GROUP BY c.author ORDER BY score '
    if(sort === 'asc'){
      sort_by+='ASC'
    }else{
      sort_by+='DESC'
    }
    try {
      const pool = await mssql.connect(hivesql_config)
      const query = "SELECT TOP 10 c.author, (SUM(c.children)+SUM(c.net_votes)) as score FROM Comments c WHERE ISJSON(c.json_metadata) > 0 AND JSON_VALUE(c.json_metadata, '$.app') IS NOT NULL AND JSON_VALUE(c.json_metadata , '$.app') = 'dBuzz/v3.0.0'"+date_filter+sort_by
      const result = await pool.request().query(query)
	  res.send(result.recordset)
    } catch (err) {
      console.error('Error executing query:', err)
      res.send(err)
    } finally {
      mssql.close()
    }
})

module.exports = getRouter