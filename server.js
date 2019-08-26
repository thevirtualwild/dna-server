const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
//const dnaRoutes = express.Router();
const PORT = 4000;


const users = require("./routes/api/users");

//CORS
app.use(cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB

//can call this from ./config/keys.js if needed
mongoose.connect('mongodb://127.0.0.1:27017/dna-dashboard', { useNewUrlParser: true })
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);



app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
