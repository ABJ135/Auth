const {DataTypes} = require("sequelize")

const sequelize = require("../database")

const Category = new sequelize('Category',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primarykey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,        
    },
    description:{
        type:DataTypes.Text
    },
},
    {
        timestamps:true
    }
)

module.exports=Category;