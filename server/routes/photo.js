const express = require('express');
const router = express.Router();
var multer  = require('multer');
var AWS = require('aws-sdk');

const authentication = require("./middleware/auth");
const Item = require('../models').Item;


const storage = multer.memoryStorage({
  destination: function(req, file, cb) {
    cb(null, '');
  }
});

const multipleUpload = multer({ storage: storage }).array('file');
const upload = multer({ storage: storage }).single('file');

// Post images
router.post("/", authentication, (req, res) => {
  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    bucket: "yasuko-my-recipes",
  });
});