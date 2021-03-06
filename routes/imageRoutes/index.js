const express = require('express');

const router = express.Router();
const services = require('../../services');

const path = require('path');
const Image = require('../../models/image');

const multer = require('multer');
// const { memory } = require('console');
// const multerConf = {
//   storage: multer.diskStorage({
//     destination: function (req, file, next) {
//       next(null, './public/images');
//     },
//     filename: function (req, file, next) {
//       const ext = file.mimetype.split('/')[1];
//       next(null, file.fieldname + '-' + Date.now() + '.' + ext);
//     },
//   }),
// };

// router.post('/', multer(multerConf).single('photo'), function (req, res) {
//   if(req.file) {
//     con
//     req.body.photo = req.file.filename
//   }
// });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).single('postImage');

router.post('/', upload, function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }

    // Everything went fine.
  });
  req.body.photo = req.file.filename;
  console.log(req.body);
  const uploadImage = new Image(req.body).save();
});

// router.get('/', function (req, res) {
//   res.sendFile()
// });
// router.get('/', function (req, res) {
//   res.sendfile(path.resolve(__dirname, '/uploads/postImage-1594337174759.jpg'));
// });

module.exports = router;
