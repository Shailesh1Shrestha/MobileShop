require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");


const corsOptions = {
  origin: "http://localhost:3000",
  mehtods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json()); //parse the incoming request with JSON payloads

app.use( authRoute );
app.use( contactRoute );
 
app.use(errorMiddleware); //this is error middleware

const PORT = 5000;
connectDB().then(() => {

  app.listen(PORT, () => { //listen to the port in the server
    console.log(`Server is running on port ${PORT}`);
  });
})


