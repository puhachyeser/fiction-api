require('dotenv').config()

const helmet = require('helmet')
const cors = require('cors')
const rateLimiter = require('express-rate-limit')

const express = require("express")
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./docs.yaml')
const app = express()

const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

const authRouter = require('./routes/auth')
const fictionsRouter = require('./routes/fictions')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(express.json())

app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    res.send(`
      <h1>API Documentation</h1>
      <a href="/api-docs">Documentation</a>
      `)
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/fictions-api/v1/auth', authRouter)
app.use('/fictions-api/v1/fictions', authenticateUser, fictionsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port http://localhost:${port}/ ...`)
    );
  } catch (error) {
    console.log(err);
  }
};

start();