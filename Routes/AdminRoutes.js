const express=require("express");
const path=require("path");
const router=express.Router();
const jwt=require("jsonwebtoken");
const Config=require("../Config/Config");
const adminController=require("../Controllers/AdminController");
const bcrypt=require("bcrypt");


const verifyToken = (token) => {
    
    return new Promise((resolve, reject) => {
        
        jwt.verify(token, Config.jwt.secretKey, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

router.post("/get-admin",async(req,res)=>{
    try{
        const decodedToken = await verifyToken(req.headers.authorization.replace('Bearer ', ''));
        const admin_name=decodedToken.mobile
      
   
    const admin= await adminController.getAdmin(admin_name);
   
    if(admin!=null){
        console.log(admin,'admin')
        return res.status(200).json(admin)
    }
    else{
        return res.status(500).json({message:'no admin'})
    }
}
catch(error){
    console.log(error,'error in fetching' )
}
})
router.post("/admin-login",async (req,res)=>{
    const {admin_name,password}=req.body;
    try{
        const token=await adminController.loginAdmin(admin_name,password)
       
        if(token!=null){
            res.status(200).json({ token:token});
        }else{
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})
/////Route to display the Users///////////
router.get('/get-users',async(req,res)=>{
    try{
        const users= await adminController.getUsers()
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
//////Route to Create the USER/////////////
 router.post("/create-user",adminController.createUser)

 router.post("/user-status", adminController.updateUserStatus)

 router.post("/get-allocated-booths", adminController.getAllocateBooths)
 
 router.get("/get-booths", adminController.getAllBooths)

 router.post("/create-allocated-booth", adminController.createAllocateBooth)

 router.get("/get-all-data", adminController.getAllData)
 
 router.get("/get-allocated-booth", adminController.getAllocateBooths)
module.exports=router;