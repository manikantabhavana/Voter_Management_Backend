const express=require('express');
const {User} = require('../Models/User');
const {Op}=require('sequelize')

const getUsers = async()=>{
    try{
        const users= await User.findAll()
        return users

    }
    catch(error){
        console.error(error,'error in fetching users from users table')
    }
}

module.exports={getUsers}