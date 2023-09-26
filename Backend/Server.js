const dotenv = require('dotenv');
const express = require("express");
const app = express();
const router = require("./Routes/Routes");
const bodyparser = require('body-parser');
const db = require("./Db/Connection")
const session = require('express-session');
const cors=require('cors')
dotenv.config()
const port = process.env.PORT || 8080

// Enable CORS for all routes
app.use(cors());

db();
app.use(session({
    secret: process.env.SECRET_KEY, // Replace with your own secret key
    resave: false,
    saveUninitialized: true
  }));

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/api", router)
app.listen(port, () => {
    console.log("Server Started at port " + port);
})