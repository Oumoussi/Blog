const config = require('./config/config')
const db = config.db()
const Authenticationcontroller = require('./controllers/AuthenticationController')
const CategorieController = require('./controllers/CategorieController')
const AuthorController = require('./controllers/AuthorController')
const PostController = require('./controllers/PostController')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API Documentation',
      version: '1.0.0',
      contact: {
        name: 'API Support',
        email: 'abderrahim.oumoussi@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8081'
      }
    ]
  },
  apis: ['src/routes.js']
}
const swaggerDocs = swaggerJsdoc(swaggerOptions)

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

  /**
   * @swagger
   * /register:
   *   post:
   *     summary: Register a new user
   *     description: Register a new user into the system.
   *     responses:
   *       200:
   *         description: User registered successfully
   */
  app.post('/register', Authenticationcontroller.register)

  /**
   * @swagger
   * /login:
   *  post:
 *     summary: Login a user
 *     description: Logs in a user to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User logged in successfully
  */
  app.post('/login', Authenticationcontroller.login)

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: List all users
   *     description: Retrieves a list of all users.
   *     responses:
   *       200:
   *         description: An array of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   name:
   *                     type: string
   *                   email:
   *                     type: string
   */
  app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
      if (err) throw err
      res.json(result)
    })
  })

  /**
   * @swagger
   * /posts:
   *   get:
   *     summary: Get all posts
   *     description: Retrieves a list of all posts.
   *     responses:
   *       200:
   *         description: An array of posts
   */
  app.get('/posts', PostController.listPosts)

  /**
   * @swagger
   * /categories:
   *   get:
   *     summary: List all categories
   *     description: Retrieves a list of all categories.
   *     responses:
   *       200:
   *         description: An array of categories
   */
  app.get('/categories', CategorieController.FetchAll)

  /**
   * @swagger
   * /categorieById:
   *   get:
   *     summary: Get a category by ID
   *     description: Retrieves a category by its ID.
   *     responses:
   *       200:
   *         description: A single category object
   */

  app.get('/authorById', AuthorController.FetchById)
}
