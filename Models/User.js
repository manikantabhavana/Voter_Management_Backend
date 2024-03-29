const {Sequelize,DataTypes}=require('sequelize')
const config=require('../Config/Config')
const sequelize=new Sequelize(config.development)
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
  const User=sequelize.define('User',{
    user_id:{
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    user_name:{
      type:DataTypes.STRING,
      allowNull:true
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    mobile_number:{
      type:DataTypes.STRING,
      allowNull:true
    },
    email:{
      type:DataTypes.STRING,
      allowNull:true
    },
    age:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    gender:{
      type: DataTypes.ENUM('Male', 'Female'),
      allowNull:false
    },
    status:{
      type:DataTypes.ENUM('Active','Deactive'),
      allowNull:false,
      defaultValue:'Active'
    },
    date:{
        type:DataTypes.DATE,
        allowNull:true
    }
  },{
    timestamps:false,
    tableName:"user_tabel"
  })

  module.exports = { User, sequelize };