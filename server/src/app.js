const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')
const morgan = require('morgan')
const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'bloguser',
  password: 'blogpass',
  database: 'blogdb'
})

connection.connect((err) => {
  if (err) throw err
})

require('./routes')(app)
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
})

console.log('Server launched')
