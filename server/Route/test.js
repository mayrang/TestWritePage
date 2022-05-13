var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var mime = require('mime');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: "../client/public/images/",
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
});

var getDownloadFilename = require('../library/getDownloadFilename').getDownloadFilename;

router.post('/files/images',  upload.single("files"), function(req, res, next) {
  console.log(req.file)
  res.send(req.file.filename)

});



module.exports = router;