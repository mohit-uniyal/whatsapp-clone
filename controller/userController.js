const {Users}=require('./../model/user');

module.exports.postAddUserController=async (req, res)=>{
    let {email}=req.body;
    try{
        let exist=await Users.findOne({email});
        if(exist){
            return res.status(200).json('user already exists');
        }
        const newUser=new Users(req.body);
        await newUser.save();
        res.status(200).json(newUser);
    }catch(err){
        return res.status(500).json(err.message);
    }
}

module.exports.getUsersController= async (req, res)=>{
    try{
        let users=await Users.find({});
        return res.status(200).json(users);
    }catch(err){
        return response.status(500).json(error.message);
    }
}