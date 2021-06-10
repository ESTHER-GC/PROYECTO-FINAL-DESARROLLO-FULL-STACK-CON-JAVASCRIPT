var db = require('../db');
var mongodb = require('mongodb');
const { validationResult } = require('express-validator');

db.connect('mongodb://localhost:27017', function (err) {
  if (err) {
    throw ('Fallo en la conexión con la BD');
  }
});

module.exports.users_list = function (req, res, next) {
 if (db.get() === null) {
   next(new Error('La conexión no está establecida'));
   return;
 }
 db.get().db('apidb').collection('users').find().toArray(function(err, result) {
   if (err) {
   next (new Error('Fallo en la conexión con la BD'));
   return;
   }
   else {
     res.send(result);
   }
 });
};

module.exports.users_create = function (req, res, next) {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(422).json({ errors: errors.array() });
 }
 if (db.get() === null) {
   next(new Error('La conexión no está establecida'));
   return;
 }
 const user = {};
 user.Nombre = req.body.Nombre;
 user.Apellidos = req.body.Apellidos;
 user.Edad = req.body.Edad;
 user.DNI = req.body.DNI;
 user.Cumpleanos = req.body.Cumpleanos;
 user.ColorFavorito = req.body.ColorFavorito; 
 user.Sexo = req.body.Sexo;
 db.get().db('apidb').collection('users').insertOne(user, function(err, result) {
   if (err) {
   next ( new Error('Fallo en la conexión con la BD') );
   return;
   }
   else {
     res.send(result);
   }
 });
};

module.exports.users_update_one = function (req, res, next) {
  if (db.get() === null) {
    next(new Error('La conexión no está establecida'));
    return;
  }
  const filter = {_id: new mongodb.ObjectID(req.params.id)}
  const update = {
    $set: {
      Nombre: req.body.Nombre, 
      Apellidos: req.body.Apellidos,
      Edad: req.body.Edad,
      DNI: req.body.DNI,
      Cumpleanos: req.body.Cumpleanos,
      ColorFavorito: req.body.ColorFavorito,
      Sexo: req.body.Sexo
    }
  };
  db.get().db('apidb').collection('users').updateOne(filter, update, function (err, result) {
    if (err) {
      next (new Error('Fallo en la conexión con la BD'));
      return;
    } 
    else {
     res.send(result);
    }
  });
};

module.exports.users_delete_one = function (req, res, next) {
  if (db.get() === null) {
    next(new Error('La conexión no está establecida'));
    return;
  }
  const filter = {_id: new mongodb.ObjectID(req.params.id)};
  db.get().db('apidb').collection('users').deleteOne(filter, function(err, result) {
    if (err) {
      next ( new Error('Fallo en la conexión con la BD') );
      return;
    } 
    else {
      res.send(result);
    }
  });
};