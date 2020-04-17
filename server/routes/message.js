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
    receiverId: req.body.receiverId
  })
  .then(conversation => {
    res.status(200).json(conversation);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// Create a message 
router.post("/:id", authentication, (req, res) => {
  Message.create({
    conversationId: req.params.id,
    text: req.body.text
  })
  .then(message => {
    res.status(200).json(message);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// Get messages 
router.get("/get-message/:id", authentication, (req, res) => {
  Message.findAll({ where: { conversationId: req.params.id}})
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Get all conversations
router.get("/get-conversations", (req, res) => {
  Conversation.findAll({})
    .then(conversations => {
      res.status(200).json(conversations);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Delete a conversation
router.delete("/delete-conversation/:id", authentication, (req, res) => {
  Conversation.findOne({ where: { id: req.params.id }})
    .then(conversation => {
      conversation.destroy();
      return res.json({ message: "Successfully deleted"});
    })
    .catch(err => {
      res.status(400).json(err);
    });
});



module.exports = router;