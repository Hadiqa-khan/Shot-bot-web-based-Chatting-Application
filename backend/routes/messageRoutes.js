// Author Name : Hadiqa khan
// Date of generation :  15 April 2022
// Date of last revision : 20 May 2022
// Version number: 4


// Purpose : The Routes which are used for the message
const express = require('express')
const {protect} = require('../middleware/authMIddleware')
const {sendMessage} = require('../controllers/messageControllers')
const {allMessages} = require('../controllers/messageControllers')
const router = express.Router();


router.route('/').post(protect,sendMessage);
router.route('/:chatId').get(protect,allMessages)

module.exports = router;
