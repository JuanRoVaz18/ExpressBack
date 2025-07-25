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


router.get('/findById/:id/json', function(req, res, next) {
    let id = parseInt(req.params.id);

    Foto.findAll({
        where: { id: id },
        attributes: { exclude: ['updatedAt', 'createdAt'] },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }]
    })
    .then(fotos => {
        res.json(fotos);
    })
    .catch(error => {
        res.status(400).send(error);
    });
});


module.exports = router;
