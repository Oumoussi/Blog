const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
  async listPosts (req, res) {
    try {
      const posts = await prisma.post.findMany({
        include: {
          Author: {
            select: {
              firstName: true,
              lastName: true
            }
          },
          Category: {
            select: {
              name: true
            }
          }
        }
      })

      if (posts.length === 0) {
        res.status(404).send('No posts found')
        return
      }
      res.json(posts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        authorName: post.Author ? `${post.Author.firstName} ${post.Author.lastName}` : 'No Author',
        categoryName: post.Category ? post.Category.name : 'No Category'
      })))
    } catch (error) {
      console.error('Error retrieving posts:', error)
      res.status(500).send('Server error')
    }
  }
}
