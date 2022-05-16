var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var mime = require('mime');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const storage = multer.diskStorage({
  destination: "../client/public/images/",
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
let db = new sqlite3.Database('../db/test.db', (err) => {
  if (err) {
      console.error(err.message);
  }
  console.log('Connected to the chinook database.');
})

router.post('/write', function(req, res){
  console.log(req.body)
  console.log(db)
  db.run(`INSERT INTO test(title, content, category) VALUES(${req.body.content}, ${req.body.title}, ${req.body.category})`, function (err) {
      if (err) {
          return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid`);
  });
});

var getDownloadFilename = require('../library/getDownloadFilename').getDownloadFilename;


const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
});



router.post('/files/images',  upload.single("files"), function(req, res, next) {
  console.log(req.file)
  res.send(req.file.filename)

});





// close the database connection
db.close((err) => {
  if (err) {
      return console.error(err.message);
  }
  console.log('Close the database connection.');
});


module.exports = router;