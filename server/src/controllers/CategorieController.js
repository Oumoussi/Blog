const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
  async FetchAll (req, res) {
    try {
      const categories = await prisma.category.findMany()
      if (categories.length === 0) {
        res.status(404).send('No categories found')
        return
      }
      res.json(categories)
    } catch (error) {
      console.error('Error fetching categories:', error)
      res.status(500).send('Server error')
    }
  }
}
