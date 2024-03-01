const express=require("express");
const {Admin}=require("../Models/Admin");
const {OP}=require("sequelize");
const jwt=require('jsonwebtoken')
const config=require('../Config/Config')
const {User}=require("../Models/User")
const {KakinadaRural}=require('../Models/KakinadaRural')
const {AllocateBooth}=require("../Models/AllocateBooth")
 

const getAdmin=async(admin_name)=>{
    try{
        const admin= await Admin.findOne({where:{admin_name}});
        if(admin!=null){
            console.log(admin,'adminat con')
            return admin;
        }
        else{
            return null
        }       
    }
    catch(error){
        console.error(error,'error in fetching users from users table')
    }
}

const loginAdmin= async (admin_name,password)=>{
    try{
        const admin= await Admin.findOne({where:{admin_name:admin_name,password:password}});
        console.log(admin,'admin')
        if(admin!=null){
            const token = jwt.sign({ mobile: admin.admin_name }, config.jwt.secretKey, { expiresIn: '12h' });
            return token;
        }else{
            return null
        }
    }
    catch(error){
        console.error(error,'error in fetching users from users table')
    }
}
const getUsers = async()=>{
    try{
        const users= await User.findAll()
        
        if(users!=null){
            return users

        }
        else{
            return null
        }
    
       
    }
    catch(error){
        console.error(error,'error in fetching users from users table')
    }
}

const createUser=async (req,res)=>{
   try{
    const{username,password,name,mobileNumber,email,age,gender}=req.body;
    const newUser=await User.create({
        user_name:username,
        password,
        name,
        mobile_number:mobileNumber,
        email,
        age,
        gender
    })
    return res.status(201).json(newUser);
   }catch(error){
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
   }
}

const updateUserStatus= async (req,res)=>{
    try{
        const {status,id}=req.body
         const user= await User.findOne({where:{user_id:id}})
        
         if(user!=null){
            
            user.status=status;
            await user.save();
            
            return res.status(200).json({message:"Success"})
         }else{
            return res.status(401).json({error:"failed"})
         }        
    }
    catch(error){
        console.error("error in updating status:" ,error);
        return res.status(500).json({error:"Internal server error"})
    }
}

const getAllocateBooths= async (req,res)=>{
    try{
     
       const AllocateBooths=await AllocateBooth.findAll()
        
         if(AllocateBooths!=null){           
            return res.status(200).json(AllocateBooths)
         }else{
            return res.status(401).json({error:"failed"})
         }
         
    }
    catch(error){
        console.error("error in updating status:" ,error);
        return res.status(500).json({error:"Internal server error"})
    }
}


const getAllBooths= async (req,res)=>{
    try{
     
       const Booths=await KakinadaRural.findAll({
        attributes: ['Booth','Wards','Village','Mandal','Constituency','Area'],
        group: ['Booth'],
      })
        
         if(Booths!=null){
           return res.status(200).json(Booths)
         }else{
            return res.status(401).json({error:"failed"})
         }
         
    }
    catch(error){
        console.error("error in updating status:" ,error);
        return res.status(500).json({error:"Internal server error"})
    }
}

const createAllocateBooth=async (req,res)=>{
    try{
     const{booth_no,user_id,name,mobile_number,village,mandal,area,constituency,ward}=req.body;
     const newUser=await AllocateBooth.create({
        booth_no,user_id,name,mobile_number,village,mandal,area,constituency,ward
     })
     
     return res.status(201).json({message:'success'});
    }catch(error){
     console.error('Error creating user:', error);
     return res.status(500).json({ error: 'Internal Server Error' });
    }
 }
 
 const getAllData= async (req,res)=>{
    try{
     
       const data=await KakinadaRural.findAll()
        
         if(data!=null){
            return res.status(200).json(data)
         }else{
            return res.status(401).json({error:"failed"})
         }
         
    }
    catch(error){
        console.error("error in updating status:" ,error);
        return res.status(500).json({error:"Internal server error"})
    }
}

module.exports={getAdmin,loginAdmin,getUsers,createUser,updateUserStatus,getAllocateBooths,getAllBooths,createAllocateBooth,getAllData}