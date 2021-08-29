const express = require("express");
const router = express.Router();
var fs = require('fs');
const connection = require('../dba/connectionDB');
const multer = require('multer');
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads/deplomes')
    },
    filename: (req, file, callBack) => {
      console.log("im in multer"+req.query.id);
        callBack(null, `${req.query.id}_${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage }) 
//////////// cvs 

const storageCV = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads/cv')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${req.query.id}_${file.originalname}`)
    }
  })
const uploadCV = multer({ storage: storageCV })

const storageImg = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'uploads/img')
  },
  filename: (req, file, callBack) => {
      //Error 
      callBack(null, `${req.query.id}_${file.originalname}`)
  }
})

const uploadImg = multer({ storage: storageImg })

router.post('/img/client',uploadImg.single('file'),(req, res, next) => {
  console.log(req.body);
  
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }

  let sql =  "update client set picture=? where id=?";
  let values = [[`http://localhost:5000/uploadFile/${req.query.id}_${file.originalname}`],[req.query.id] ];
  connection.query(sql,values,(error,result,fields)=>{

  if(error){
       console.log(error);
       return res.status(404).send(error);
       // i have to cancel the sign up
  }
  return res.json({src : `http://localhost:5000/uploadFile/${req.query.id}_${file.originalname}`});

})
} );
const uploadImgSpecialiste = multer({ storage: storageImg })

router.post('/img/specialiste',uploadImgSpecialiste.single('file'),(req, res, next) => {
  console.log(req.body);
  
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  let sql =  "update specialiste set picture=? where id=?";
let values = [[`http://localhost:5000/uploadFile/${req.query.id}_${file.originalname}`],[req.query.id] ];
connection.query(sql,values,(error,result,fields)=>{

if(error){
     console.log(error);
     return res.status(404).send(error);
     // i have to cancel the sign up
}
return res.json({src : `http://localhost:5000/uploadFile/${req.query.id}_${file.originalname}`});

})
 
} );


router.post('/deplome',upload.single('file'),(req, res, next) => {
    // console.log(req.query.id);
    const file = req.file;
    console.log(file.originalname);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
    let sql =  "update specialiste set deplome=? where id=?";
        let values = [[`${req.query.id}_${file.originalname}`],[req.query.id] ];
        connection.query(sql,values,(error,result,fields)=>{

        if(error){
             console.log(error);
             return res.status(404).send(error);
             // i have to cancel the sign up
        }

      })
      // res.send(file);
  });

router.get('/client/deplome',(req,res)=>{
// console.log(req.body.id)
//   let sql =  "select deplome from specialiste where id=?";
//   let values = [[req.body.id]];
//   connection.query(sql,values,(error,result,fields)=>{
//   if(error){
//        console.log(error);
//        return res.status(404).send(error);
//        // i have to cancel the sign up
//   }


    const filePath = `${__dirname}/aneexees.pdf`; // or any file format
    // Check if file specified by the filePath exists
    console.log(filePath);
    fs.stat(filePath, function (error,stats) {
        if (!error) {
            res.writeHead(200, {
                "Content-Type": "application/pdf",
                "Content-Disposition": "attachment; filename=" + filePath
            });
            res.end();
            // fs.createReadStream(mypath).pipe(res);
            return;
        }
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("ERROR File does not exist");

})
  
});
  //  the full path is /api_registre/client   
router.post('/cv',uploadCV.single('file'),(req, res, next) => {
  // console.log(req.query.id);
    const file = req.file;
    console.log(file);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
    let sql =  "update specialiste set cv=? where id=?";
    let values = [[`${req.query.id}_${file.originalname}`],[req.query.id] ];
    connection.query(sql,values,(error,result,fields)=>{

    if(error){
         console.log(error);
         return res.status(404).send(error);
         // i have to cancel the sign up
    }

  })
      res.send(file);
  } ); // the full path is /api_registre/specialiste 


module.exports = router;