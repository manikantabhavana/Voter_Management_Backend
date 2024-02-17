const express=require('express');

const path = require('path');
const router=express.Router();
const jwt=require('jsonwebtoken');
const config=require('../Config/Config');
const userController=require('../Controllers/UserController')

router.post('/login',async(req,res)=>{
    try{

        

    }
    catch(error){
        console.error(error,'error in getting')
    }
})


module.exports=router;