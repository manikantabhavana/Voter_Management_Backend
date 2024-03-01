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
  const AllocateBooth=sequelize.define('AllocateBooth',{
    user_id:{
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    mobile_number:{
      type:DataTypes.STRING,
      allowNull:true
    },
    booth_no:{
        type:DataTypes.INTEGER,
        allowNull:true
      },
      ward:{
        type:DataTypes.INTEGER,
        allowNull:true
      },
      area:{
        type:DataTypes.STRING,
        allowNull:true
      },
      constituency:{
        type:DataTypes.STRING,
        allowNull:true
      },
      village:{
        type:DataTypes.STRING,
        allowNull:true
      },
      mandal:{
        type:DataTypes.STRING,
        allowNull:true
      },
    date:{
        type:DataTypes.DATE,
        allowNull:true
    }
  },{
    timestamps:false,
    tableName:"allocated_booth"
  })

  module.exports = { AllocateBooth, sequelize };