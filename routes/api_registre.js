const express = require("express");
const router = express.Router();
const checkRegistreClient = require("../dba/registreClient");
const checkRegistreSpecialiste = require("../dba/registreSpecialiste");
router.post('/client',checkRegistreClient); // the full path is /api_registre/client   
router.post('/specialiste',checkRegistreSpecialiste); // the full path is /api_registre/specialiste 


module.exports = router;