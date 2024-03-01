const {DataTypes, Sequelize}=require("sequelize");
const config=require("../Config/Config");
const sequelize=new Sequelize(config.development)
sequelize
.authenticate()
.then(()=>{
    console.log("Connection has been established successfully");
}) 
.catch((err)=>{
    console.error('Unable to connect to the database:', err);
})

const Admin=sequelize.define('Admin',{
    admin_id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    admin_name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    mobile_number:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mail:{
        type:DataTypes.STRING,
        allowNull:false
    },
    constituency:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    timestamps:false,
    tableName:"admin_tabel"
}
)
module.exports={Admin,sequelize}