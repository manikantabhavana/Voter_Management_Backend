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
  const User = sequelize.define('User', {

    username: { 
      type: DataTypes.STRING, 
      allowNull: true,
      primaryKey:true
      
  },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
   
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    Age:{
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    Gender: {
        type: DataTypes.ENUM('Male', 'Female'),
      allowNull: false,
     
      },
      Gender: {
        type: DataTypes.ENUM('Active', 'Inactive'),
      allowNull: false,
      defaultValue: 'Active',
     
      },
    
    
   
  }, {
      timestamps:true,
   
    tableName: 'users'
   
  });

  module.exports = { User, sequelize };

