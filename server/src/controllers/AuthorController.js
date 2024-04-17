const config = require('../config/config')
const db = config.db()
module.exports = {
  FetchById (req, res) {
    const { id } = req.body
    const query = 'SELECT * FROM authors WHERE id = ?'
    db.query(query, [id], (err, result) => {
      if (err) throw err
      res.json(result)
    })
  }
}
