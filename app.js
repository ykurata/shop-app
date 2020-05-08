const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const passport = require("passport");
const cors = require('cors');
const app = express();

// Socket setup
const socketio = require('socket.io');
const server = require('http').Server(app);
const io = socketio(server);
const socketEvents = require('./server/socket');
socketEvents(io);

// Import routes
const user = require("./server/routes/user");
const item = require("./server/routes/item");
const image = require("./server/routes/image");
const message = require("./server/routes/message");

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./server/config/passport")(passport);

// Routes
app.use("/user", user);
app.use("/item", item);
app.use("/image", image);
app.use("/message", message);

// Set up cors
app.use(cors());

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});
  
// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server up and running on port ${port} !`));

module.exports = server;