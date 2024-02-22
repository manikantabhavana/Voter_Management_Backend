const dotenv=require('dotenv')
dotenv.config()
module.exports = {
    development: {
      username: process.env.DB_USERNAME,
      
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password:process.env.DB_PASSWORD,
      port:3306,
      dialect: process.env.DB_DIALECT
    },
  
    jwt:{
      secretKey:process.env.secretKey,
    },
   
}
