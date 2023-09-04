const router=require('express').Router();
const {postAddUserController, getUsersController}=require('./../controller/userController.js');
const {postNewConversation, postGetCoversationController}=require('./../controller/conversationController.js');
const {postAddMessageController, postGetMessagesController}=require('./../controller/messageController.js');

router.post('/addUser', postAddUserController);

router.get('/getUsers', getUsersController);

router.post('/conversation/add', postNewConversation);

router.post('/conversation/get', postGetCoversationController);

router.post('/message/add', postAddMessageController);

router.post('/message/get', postGetMessagesController);

module.exports=router;