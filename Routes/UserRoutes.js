const express=require('express');
const cors=require("cors");
const path = require('path');
const router=express.Router();
const jwt=require('jsonwebtoken');

const config=require('../Config/Config');
const userController=require('../Controllers/UserController')
router.use(cors());
const port=5000;

router.get('/get-users',(req,res)=>{
    const users=userController.getUsers()
    if(users!=null){
        return res.status(200).json(users)
    }
    else{
        return res.status(500).json({message:'no users'})
    }
})
module.exports=router;