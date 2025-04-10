require('dotenv').config();

const express = require("express")
const app = express()

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

const authRouter = require('./routes/auth');
const fictionsRouter = require('./routes/fictions');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Main")
})

app.use('/fictions-api/v1/auth', authRouter);
app.use('/fictions-api/v1/fictions', authenticateUser, fictionsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port http://localhost:${port}/ ...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();