const {conversation}=require('./../model/conversation');

module.exports.postNewConversation=async (req, res)=>{
    try{
        const {senderId, receiverId}=req.body;
        const exist=await conversation.findOne({members: {senderId, receiverId}});
        if(exist){
            return res.status(200).json('conversation already exists');
        }
        const newConversation=new conversation({
            members: {
                senderId,
                receiverId
            }
        })
        await newConversation.save();
        return res.status(200).json(newConversation);
    }catch(err){
        return res.status(500).json(err.message);
    }
}

module.exports.postGetCoversationController=async (req, res)=>{
    const {senderId, receiverId}=req.body;
    try{
        let data=await conversation.findOne({members: {senderId, receiverId}});
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err.message);
    }
}