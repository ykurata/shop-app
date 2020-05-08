const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const passport = require("passport");
const cors = require('cors');
const app = express();

// Socket setup
// const socketio = require('socket.io');
const server = require('http').createServer(app);
// const io = socketio(server);
const io = require('socket.io').listen(server);
const socketEvents = require('./socket');
socketEvents(io);

// Import routes
const user = require("./routes/user");
const item = require("./routes/item");
const image = require("./routes/image");
const message = require("./routes/message");

app.use(logger('dev'));
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

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
  });
}


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