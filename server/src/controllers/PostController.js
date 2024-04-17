const config = require('../config/config')
const db = config.db()
module.exports = {
  FetchAll (req, res) {
    const query = 'SELECT posts.id, posts.title, posts.content, posts.created_at, authors.* FROM posts JOIN authors ON posts.author_id = authors.id;'
    db.query(query, (err, result) => {
      if (err) throw err
      res.json(result)
    })
  }
}
