const express=require('express');
const path = require('path');
const router=express.Router();
const jwt=require('jsonwebtoken');
const config=require('../Config/Config');
const userController=require('../Controllers/UserController')
const bcrypt=require("bcrypt");
// const {User}=require("../Models/User");


 

///ROUTE FOR USERLOGIN////
router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    try{
        const userLogin=userController.loginUser(username);
        // const userLogin=await User.findOne({where:{username,isAdmin:false}});       
        if(userLogin){
            const isPasswordValid= await bcrypt.compare(password,userLogin.password);
            if(isPasswordValid){
                const token=jwt.sign({username:userLogin.username,isAdmin:false},"key",{expiresIn:"5h"})
                res.json({success:true,token});
            }else{
                res.status(401).json({error:"Incoorect password"})
            }                      
        }else{
            res.status(401).json({error:"User not found"})
        }
    }
    catch(error){
        console.error(error,'error in getting')
    }
});

////ROUTE FOR CREATE NEW USER////////

router.post("/create-user",async(req,res)=>{
    const {username,password,Name,Age,Gender,Status}=req.body;
    try{
        const newUser= await userController.createUser({
            username,
            password,
            Name,
            Age,
            Gender,
            Status
        });
        res.status(201).json({success:true,message:"user Registered Successfully",user:newUser})

    }catch(error){
            console.error('Error in User Registration',error);
            res.status(400).json({error:"Internal server error"})
    }
    
});

/////Route to display the Users///////////
router.get('/get-users',async(req,res)=>{
    try{
        const users= await userController.getUsers()
    if(users!=null){
        return res.status(200).json(users)
    }
    else{
        return res.status(401).json(message,'empty users')

    }
}
catch(error){
    console.error(error,'error in fetching users')
}
})

///////Route to update the  user status////////
router.post("/update-status/:id/status", async (req,res)=>{
    const {id}= req.params;
    const {newStatus}=req.body;
    try{
        const user=await userController.getUserById(id);
        if(!user){
            return res.status(404).json({error:"User not found"});
           }
           user.Status=newStatus;
           await user.save();
           res.json({success:true,message:"User status updated Successfully"},user)
    }
    catch(error){
        console.error("Error updating user status",error);
        res.status(500).json({error:"Internal Server Error"})
    }
})

//////////Route to Delete the User//////////

router.delete("/delete-user/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const user =await userController.getUserById(id);
        if(!user){
            res.status(404).json({error:"User not found"})
        }
        await user.destroy();
        res.json({success:true,message:"User Deleted Successfully"})
    }
    catch(error){
        console.error("Error in Deleting User",error);
        res.status(500).json({error:"Internal Server User"})
    }
});
module.exports=router;