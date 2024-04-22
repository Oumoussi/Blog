const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {

  async register (req, res) {
    const { user, author } = req.body
    const { email, password } = user
    const { firstname, lastname, birthday } = author

    try {
      const result = await prisma.$transaction(async (prisma) => {
        const newUser = await prisma.user.create({
          data: {
            emailUser: email,
            pwdUser: password,
            Authors: {
              create: {
                firstName: firstname,
                lastName: lastname,
                dateBd: new Date(birthday)
              }
            }
          }
        })

        return newUser
      })

      res.status(201).send(`You have been registered successfully! User ID: ${result.id}`)
    } catch (error) {
      console.error('Registration error:', error)
      res.status(500).send('Error adding the user')
    }
  },

  async login (req, res) {
    const { email, password } = req.body

    try {
      const user = await prisma.user.findFirst({
        where: {
          emailUser: email,
          pwdUser: password
        },
        include: {
          Authors: true
        }
      })
      if (!user) {
        res.status(404).send('User not found')
        return
      }

      if (user.Authors.length > 0) {
        const author = user.Authors[0]
        res.json({
          message: `Welcome ${author.firstName}`,
          username: author.firstName
        })
      } else {
        res.status(404).send('Author details not found for this user.')
      }
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).send('Server error')
    }
  }

}
