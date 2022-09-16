const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    heightMin:{
      type: DataTypes.INTEGER
    },    
    heightMax:{
      type: DataTypes.INTEGER
    },
    weightMin:{
      type: DataTypes.INTEGER
    },
    weightMax:{
      type: DataTypes.INTEGER
    },
    life_ageMin:{
      type: DataTypes.INTEGER
    },
    life_ageMax:{
      type: DataTypes.INTEGER
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