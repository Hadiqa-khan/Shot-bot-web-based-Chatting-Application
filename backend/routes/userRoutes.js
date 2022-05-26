// Author Name : Hadiqa Khan
// Date of generation : 1 May  2022
// Date of last revision : 12-May-2022
// Version number: 3
// Purpose : The Routes which are used for the user
const express = require('express');
const {registerUser,authUser,allUsers} = require('../controllers/userControllers')
const {protect} = require("../middleware/authMIddleware")
const  router = express.Router()

router.route('/').post(registerUser).get(protect,allUsers);
router.post('/login',authUser)


module.exports=router;
