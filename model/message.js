const mongoose=require('mongoose');
const {Schema}=mongoose;

const messageSchema=new Schema({
    conversationId: String,
    senderId: String,
    receiverId: String,
    text: String,
    type: String
},
{
    timestamps: true
})

const message=mongoose.model('message', messageSchema);

module.exports=message;