const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config();

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const URL=`mongodb+srv://${USERNAME}:${PASSWORD}@whatsapp-clone.nmcxiug.mongodb.net/?retryWrites=true&w=majority`;

const connectToDatabase=async ()=>{
    try{
        await mongoose.connect(URL, {useUnifiedTopology: true});
        console.log("database connected successfully");
    }catch(err){
        console.log(err);
    }
}

module.exports.connectToDatabase=connectToDatabase;