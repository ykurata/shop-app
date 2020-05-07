const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");

const authentication = require("./middleware/auth");

const Conversation = require('../models').Conversation;
const Message = require('../models').Message;
const Item = require('../models').Item;
const User = require('../models').User;
const Notification = require('../models').Notification;


// Create a new conversaion
router.post("/create-conversation/:id", authentication, (req, res) => {
  Conversation.findAll({ where: { senderId: req.user, itemId: req.params.id }})
    .then(conversations => {
      if (conversations.length > 0) {
        res.status(400).json({ error: "You already sent a message"});
      } else {
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
      }
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


// Create a message 
router.post("/:id", authentication, (req, res) => {
  Message.create({
    conversationId: req.params.id,
    userId: req.user,
    text: req.body.text
  })
  .then(message => {
    res.status(200).json(message);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// Get messages by conversationId
router.get("/get-message/:id", authentication, (req, res) => {
  Message.findAll({ where: { conversationId: req.params.id }} )
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

// Get a list of login user's conversations 
router.get("/get-conversations/:id", authentication, (req, res) => {
  Conversation.findAll({ 
    where: {  
      [Op.or]: [
        { senderId: req.params.id },
        { receiverId: req.params.id }
      ]
    },
    include: [
      { 
        model: Message
      },
      {  
        model: Item,
        include: [{ model: User }]
      }
    ],
    order: [[ "createdAt", "DESC"]] 
  })
  .then(conversations => {
    res.json(conversations)
  })
  .catch(err => {
    console.log(err);
  });
});

// Get a specific conversation
router.get("/get-conversation/:conId", authentication, (req, res) => {
  Conversation.findOne({
    where: { id: req.params.conId },
    include: [
      {
        model: Item,
        include: [{ model: User }]
      }
    ]
  })
  .then(conversation => {
    res.status(200).json(conversation);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});


// Create a notification
router.post("/notification/:id", authentication, (req, res) => {
  Notification.create({
    senderId: req.params.id,
    receiverId: req.body.receiverId
  })
  .then(notification => {
    res.status(200).json(notification);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});


// Get login user's notifications 
router.get("/notifications/:id", authentication, (req, res) => {
  Notification.findAll({where: { receiverId: req.params.id }})
    .then(notifications => {
      res.status(200).json(notifications);
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