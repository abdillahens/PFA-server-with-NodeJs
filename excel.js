var Excel = require('exceljs');
//const assert = require("chai").assert;

var workbook = new Excel.Workbook(); 
workbook.xlsx.readFile('./uploads/excel/sample3.xlsx')
    .then(function() {
        console.log(workbook)
        // const sheet = workbook.addWorksheet('Sheet1');
        var worksheet = workbook.getWorksheet('Sheet1');
        worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
          console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
        });
    });