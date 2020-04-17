const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const passport = require("passport");

const app = express();

const user = require("./routes/user");
const item = require("./routes/item");
const image = require("./routes/image");
const message = require("./routes/message");


app.use(logger('dev'));
// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/user", user);
app.use("/item", item);
app.use("/image", image);
app.use("/message", message);


// Set up cors
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

module.exports = app;