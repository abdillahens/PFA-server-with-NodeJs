const express = require("express");
const router = express.Router();
var fs = require('fs');
const connection = require('../dba/connectionDB');
const multer = require('multer');
const path = require("path");
const xlsxFile = require('read-excel-file/node');
const Excel = require('exceljs');
const mysql = require('mysql');
const { resolve } = require("path");
//const unzip = require('unzip2');
//fs.createReadStream('./uploads').pipe(unzip.Extract({ path: 'output/path' }));

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

//excel file data 
const storageExcelData = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'uploads/excel')
  },
  filename: (req, file, callBack) => {
      callBack(null, `${file.originalname}`)
  }
})
const excelData = multer({ storage: storageExcelData })


const storageImg = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'uploads/img/client')
  },
  filename: (req, file, callBack) => {
      //Error 
      callBack(null, `${req.query.id}_${file.originalname}`)
  }
})

const storageImgSpecialiste = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'uploads/img/specialiste')
  },
  filename: (req, file, callBack) => {
      //Error 
      callBack(null, `${req.query.id}_${file.originalname}`)
  }
})

const uploadImg = multer({ storage: storageImg })

router.post('/img/client',uploadImg.single('file'),(req, res, next) => {
  try{
  console.log(req.body);
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  console.log(req.query.id);

  let sql =  "update User set picture=? where id=?";
  let values = [[`http://80.240.28.95/backend/uploadFileClient/${req.query.id}_${file.originalname}`],[req.query.id] ];
  connection.query(sql,values,(error,result,fields)=>{

  if(error){
       console.log(error);
       return res.status(404).send(error);
       // i have to cancel the sign up
  }
  
  return res.json({src : `http://80.240.28.95/backend/uploadFileClient/${req.query.id}_${file.originalname}`});

})
}
catch(e){console.log(e); return res.status(404).send(e);}
}
 );
const uploadImgSpecialiste = multer({ storage: storageImgSpecialiste })

router.post('/img/specialiste',uploadImgSpecialiste.single('file'),(req, res, next) => {

try{
  console.log(req.body);
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  let sql =  "update User set picture=? where id=?";
let values = [[`http://80.240.28.95/backend/uploadFileSpecialiste/${req.query.id}_${file.originalname}`],[req.query.id] ];
connection.query(sql,values,(error,result,fields)=>{

if(error){
     console.log(error);
     return res.status(404).send(error);
     // i have to cancel the sign up
}
return res.json({src : `http://80.240.28.95/backend/uploadFileSpecialiste/${req.query.id}_${file.originalname}`});
})
 
}catch(e){console.log(e);return res.status(404).send(e);}
}

);


router.post('/deplome',upload.single('file'),(req, res, next) => {
  try{
    // console.log(req.query.id);
    const file = req.file;
    console.log(file.originalname);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
    let sql =  "update User set deplome=? where id=?";
        let values = [[`${req.query.id}_${file.originalname}`],[req.query.id] ];
        connection.query(sql,values,(error,result,fields)=>{

        if(error){
             console.log(error);
             return res.status(404).send(error);
             // i have to cancel the sign up
        }

      })
    }catch(e){console.log(e);return res.status(404).send(error);}
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

  try{
    const file = req.file;
    console.log(file);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
    let sql =  "update User set cv=? where id=?";
    let values = [[`${req.query.id}_${file.originalname}`],[req.query.id] ];
    connection.query(sql,values,(error,result,fields)=>{

    if(error){
         console.log(error);
         return res.status(404).send(error);
         // i have to cancel the sign up
    }

  })
      res.send(file);
  } catch(e){console.log(e);return res.status(404).send(e)}
}
  ); // the full path is /api_registre/specialiste 

    //  the full path is /api_registre/client   
router.post('/excel/data',excelData.single('file'),(req, res, next) => {
  // console.log(req.query.id);
    const file = req.file;
    console.log(file);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
//     var workbook = new Excel.Workbook(); 
// workbook.xlsx.readFile(`./uploads/excel/${file.originalname}`)
//     .then(function() {
//         var worksheet = workbook.getWorksheet('Sheet1');
//         worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
//           //console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
//           console.table(row);
//         });
//     })
// cxlsxFile = require('read-excel-file/node');
 
xlsxFile(`./uploads/excel/${file.originalname}`).then((rows) => {
 //console.log(rows);
//  console.table(rows);
var i=0;

  rows.forEach((col)=>{
    // console.log(col);
    //console.log(i)
    if(i===0){
      console.log("jjjjj")
      i=1;return;}
      
      var insert = new Promise((resolve,reject)=>{
    let sql = "insert into User(prenom,nom,email,numero_tele,date_naissance,sexe,niveauScolaire,profession,password,isConfirmed,role) values ?";
    let values = [[col[1], col[2], col[3], col[4], col[5], col[6], col[7],'Etudiant', col[8],true,'client']];
    connection.query(sql, [values], (error, result, fields) => {
  
        if (error) {
           // console.log(error);
            console.log("facking eror")
            reject(error);
        }
        i++;
        resolve(i);
      })

    })
    insert.catch((err)=>{console.log(err)})
  });
  console.log('the i is' +i);

})



  } ); // the full path is /api_registre/specialiste 

module.exports = router;