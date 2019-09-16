const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
const keys = require("./config/keys");
const randomatic = require("randomatic");
//const dnaRoutes = express.Router();
const PORT = 4000;

const auth = require("./routes/api/auth");
const users = require("./routes/api/users");
const accounts = require("./routes/api/accounts");
const devices = require("./routes/api/devices");

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


//local mongo connection (comment out to use Cloud version)
//mongoose.connect('mongodb://127.0.0.1:27017/dna-dashboard', { useNewUrlParser: true });

//Mongo Cloud Atlas - can modify this from ./config/keys.js if needed
mongoose.connect(keys.mongoCloudURI, { useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/accounts", accounts);
app.use("/api/devices", devices);



app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);

});
