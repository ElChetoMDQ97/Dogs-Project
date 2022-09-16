const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    height:{
      type: DataTypes.STRING
    },
    weight:{
      type: DataTypes.STRING
    },
    life_age:{
      type: DataTypes.STRING
    },
    fan:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    origin:{
      type: DataTypes.STRING
    },
    breed_group:{
      type: DataTypes.STRING
    },
    bred_for:{
      type: DataTypes.STRING
    },
  },
  {
    timestamps: false
  });
};