var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const { Foto, Etiqueta } = require('../models');

/* GET home page home*/
router.get('/findAll/json', function(req, res, next) {
  Foto.findAll({
    attributes: { exclude: ['updatedAt'] },
    include: {
      model: require('../models').Etiqueta,
      attributes: ['id', 'texto'],
      through: { attributes: [] }
    }
  })
  .then(fotos => {
    res.json(fotos);
  })
  .catch(error => res.status(400).send(error));
});

router.get('/findAll/view', function(req, res, next) {
  Foto.findAll({
    attributes: { exclude: ['updatedAt'] },
    include: {
      model: Etiqueta,
      attributes: ['id', 'texto'],
      through: { attributes: [] }
    }
  })
  .then(fotos => {
    res.render('fotos', { title: 'Fotos', arrFotos: fotos });
  })
  .catch(error => res.status(400).send(error));
});

router.get('/findById/json/:id', function(req, res, next) {
  const id = req.params.id; 

  Foto.findByPk(id, {
    attributes: { exclude: ['updatedAt'] }, 
    include: {
      model: Etiqueta, 
      attributes: ['id', 'texto'], 
      through: { attributes: [] } 
    }
  })
  .then(foto => {
    if (!foto) {
      return res.status(404).json({ message: 'Foto no encontrada' });
    }
    res.json(foto); 
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al obtener la foto', error }); 
  });
});

module.exports = router;
