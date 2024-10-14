const express = require("express");
const usercontroller = require('../controllers/usercontroller');

const router = express.Router();
router.post('/userregistration',usercontroller.registration)
router.post('/userlogin',usercontroller.userlogin)
router.put('/userupdate/(:id)',usercontroller.userupdate)
router.delete('/userdelete/(:id)',usercontroller.userdelete)
router.get('/singleuserlist/(:id)',usercontroller.singleuserlist)
module.exports = router; 