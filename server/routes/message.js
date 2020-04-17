const express = require('express');
const router = express.Router();

const authentication = require("./middleware/auth");

const Message = require('../models').Message;

module.exports = router;