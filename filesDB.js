const express = require("express");
const router = express.Router();
var fs = require('fs');
const multer = require('multer');

  
const upload = multer({ storage: multer.memoryStorage() }) 
//////////// cvs 

const uploadCV = multer({ storage: multer.memoryStorage() })


router.post('/deplome',upload.single('file'),(req, res, next) => {
    // console.log(req.body);
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  });
   // the full path is /api_registre/client   
router.post('/cv',uploadCV.single('file'),(req, res, next) => {
    // console.log(req.body);
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  } ); // the full path is /api_registre/specialiste 
 


module.exports = router;