const mysql = require('mysql')

const db = {
  host: 'localhost',
  user: 'bloguser',
  password: 'blogpass',
  database: 'blogdb'
}

function createDbConnection () {
  const connection = mysql.createConnection(db)
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.stack)
    }
  })
  return connection
}
module.exports = {
  port: process.env.PORT || 8081,
  db: createDbConnection
}
