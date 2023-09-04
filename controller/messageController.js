const message=require('./../model/message');
const {conversation}=require('./../model/conversation');

module.exports.postAddMessageController=async (req, res)=>{
    try{
        const newMessage=new message(req.body);
        await newMessage.save();
        await conversation.updateOne({_id: req.body.conversationId}, {
            $set: {message: req.body.text}
        });
        return res.status(200).json('Message has been sent successfully');
    }catch(err){
        return res.status(500).json(err.message);
    }
}

module.exports.postGetMessagesController=async (req, res)=>{
    const {senderId, receiverId}=req.body;
    try{
        const messages=await message.find({
            $or: [
                {
                    senderId: senderId,
                    receiverId: receiverId
                },
                {
                    senderId: receiverId,
                    receiverId: senderId
                }
            ]
        });
        return res.status(200).json(messages);
    }catch(err){
        return res.status(500).json(err.message);
    }
}