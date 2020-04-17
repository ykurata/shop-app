const express = require('express');
const router = express.Router();

const authentication = require("./middleware/auth");

const Conversation = require('../models').Conversation;
const Message = require('../models').Message;


// Create a new conversaion
router.post("/create-conversation/:id", authentication, (req, res) => {
  Conversation.create({
    itemId: req.params.id,
    senderId: req.user,
    recieverId: req.body.recieverId
  })
  .then(conversation => {
    res.status(200).json(conversation);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});


module.exports = router;