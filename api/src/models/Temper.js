const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temper', {
    t_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    t_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
  },
  {
    timestamps: false
  });
};