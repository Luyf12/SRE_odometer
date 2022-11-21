const express = require("express");
const app = express();
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const dashboar = require("./routes/dashboard");
const connectDB = require("./db/connect");
const notFound = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/error-handler");

require("dotenv").config();

app.use(xss());
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/", dashboar);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4538;

const repo = require("./controllers/import-db");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));



  } catch (error) {
    console.log(error);
  }
  
};

start();


