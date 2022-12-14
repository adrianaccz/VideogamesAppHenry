const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date_launch: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    rating: {
      type: DataTypes.STRING
    },
    plataforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    createdInDB:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: "https://tipseducacion.com/wp-content/uploads/2014/04/video-juegos1.jpg"
    }
  },{
    timestamps: false
  });
};
