require('dotenv').config();

const express = require("express")
const app = express()

const connectDB = require('./db/connect');

//const authenticateUser = require('./middleware/authentication');

//const authRouter = require('./routes/auth');
//const fictionsRouter = require('./routes/fictions');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Main")
})

//app.use('/fiction-api/v1/auth');
//app.use('/fiction-api/v1/fictions'); //authenticateUser, fictionsRouter

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