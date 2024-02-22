const express=require('express');
const cors=require("cors");
const path = require('path');
const router=express.Router();
const jwt=require('jsonwebtoken');
const {MongoClient}=require("mongodb");
const config=require('../Config/Config');
const userController=require('../Controllers/UserController')
router.use(cors());
const port=5000;

const uri="mongodb://localhost:27017";
const database="Voter_Management";
const client=new MongoClient(uri);
router.get("/api/get-users",async(req,res)=>{
    try{
        await  client.connect();
        console.log("connected tonmongoDb");
       const dbs=client.db(database);
       const table=dbs.collection('users');
       const docs=await table.find({}).toArray();
       console.log(docs);
       res.json(docs)
    }
    catch(error){
                console.error('error during operation',error)
                res.status(500).send('Internal Server Error')
            }
            finally{
                await client.close();
            }
})


// router.post('/login',async(req,res)=>{
//     try{
//     }
//     catch(error){
//         console.error(error,'error in getting')
//     }
// })




module.exports=router;