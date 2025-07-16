'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Foto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

        models.Foto.belongsToMany(models.etiqueta, { through:

          'fotoetiquetas', foreignKey: "foto_id"});
        }
   }
  Foto.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    calificacion: DataTypes.FLOAT,
    ruta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Foto',
  });
  return Foto;
};