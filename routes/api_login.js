const express = require("express");
const router = express.Router();
const checkLogin = require('../dba/login');
router.post('/',checkLogin);// the full path is /api_login/    , check the function in /dba/login

module.exports = router; 
