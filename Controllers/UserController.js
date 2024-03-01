const express=require('express');
const {User} = require('../Models/User');
const {Op}=require('sequelize')
 
const loginUser=async ()=>{
    try{
        const users=await User.findOne();
        return users;
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
const createUser=async ()=>{
    try{
        const users=await User.create();
        return users;
    }
    catch(error){
        console.error(error,'error in fetching users from users table')
    }
}

const getUserById=async ()=>{
    try{
        const users = await User.findByPk();
        return users;
    }
    catch(error){
        console.error(error,'error in fetching users from users table')
    }
}

module.exports={getUsers,loginUser,createUser,getUserById};