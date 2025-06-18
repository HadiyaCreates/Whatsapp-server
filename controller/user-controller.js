import User from '../model/User.js';
export const addUser = async(request , response)=>{
   try{
       let exist = await User.findOne({sub: request.body.sub});
       if(exist){
           response.status(200).json({msg:'User already exists'});
           return;
       }
       
       const newUser=new User(request.body);
      await newUser.save();   
    return response.status(201).json(newUser);
   }
   catch(error){
       response.status(500).json({message: error.message});
   }
}
export const getUsers = async(request , response)=>{
    try{
        const users = await User.find({});
        return response.status(200).json(users);
    }
    catch(error){
        response.status(500).json({message: error.message});
    }
}