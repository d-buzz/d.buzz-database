const fs = require('fs')

if (!fs.existsSync('./.env')){
  console.log('Created .env file, please add credentials manually.');
  fs.createReadStream('./.env.example').pipe(fs.createWriteStream('./.env'));
} else {
	console.log('.env file already exists, please delete it to create another one.');
}