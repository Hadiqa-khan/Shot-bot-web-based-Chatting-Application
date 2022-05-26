// Author Name : Hadiqa Khan
// Date of generation : 30 April 2022
// Date of last revision : 10-May-2022
// Version number: 4


// Purpose : The Routes which are used for the chat
const express = require('express');
const router = express.Router();
const {accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup} = require("../controllers/chatControllers")
const {protect} = require("../middleware/authMIddleware")

router.route('/').post(protect,accessChat);
router.route('/').get(protect,fetchChats);
router.route('/group').post(protect,createGroupChat);
router.route('/rename').put(protect,renameGroup);
router.route('/groupremove').put(protect,removeFromGroup);
router.route('/groupadd').put(protect,addToGroup);

module.exports = router;
