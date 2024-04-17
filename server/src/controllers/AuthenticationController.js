const config = require('../config/config')
const db = config.db()
module.exports = {

  async register (req, res) {
    const { user, author } = req.body
    const { email, password } = user
    const { firstname, lastname, birthday } = author
    const sql = 'INSERT INTO `users`(`email_user`, `pwd_user`) VALUES (?, ?)'
    db.query(sql, [email, password], (err, results) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error adding the user')
        return
      }
      const userId = results.insertId
      const authorsSql = 'INSERT INTO `authors`(`user_id`, `first_name`, `last_name`, `date_bd`) VALUES (?, ?, ?, ?)'
      db.query(authorsSql, [userId, firstname, lastname, birthday], (authorsErr, authorsResults) => {
        if (authorsErr) {
          res.status(500).send(authorsErr)
          return
        }
        res.status(201).send('You have been registered successfully!')
      })
    })
  },
  login (req, res) {
    const { email, password } = req.body
    const sql = 'SELECT * FROM users where email_user = ? and pwd_user = ?'
    db.query(sql, [email, password], (err, results) => {
      if (err) {
        res.status(500).send('Server error')
        return
      }
      if (results.length === 0) {
        res.status(404).send('User not found')
      } else {
        const user = results[0]
        if (password === user.pwd_user) {
          const userId = user.id
          const authorsSql = 'SELECT * FROM authors WHERE user_id = ?'
          db.query(authorsSql, [userId], (authorsErr, authorsResults) => {
            if (authorsErr) {
              res.status(500).send(authorsErr)
              return
            }
            res.json({
              message: `Welcome ${authorsResults[0].first_name}`,
              username: authorsResults[0].first_name
            })
          })
        } else {
          res.status(401).json({ message: 'Incorrect password' })
        }
      }
    })
  }

}
