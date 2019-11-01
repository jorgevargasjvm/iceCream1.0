var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const admin = require('../firebase/firedase');
var db = admin.database();

router.post('/', jsonParser, (req, res)=> {
  res.send('API Ordenes');
  
});

router.post('/create', jsonParser, async(req, res)=> {
  var token = req.body.iceCreamToken;
  var listaOrdenes = req.body.listaOrdenes;

  var email = req.body.email;
  var myUser;
  var empleado;

  
  var crear = false;
  var usuarios;

  const user = await db.ref('usuarios').once('value', (dataSnapshot)=>{
    usuarios = dataSnapshot.val();
    var id_1;
    var id_2;
    for (const key in usuarios) {

      if(req.body.listaOrdenes.minutos > 0 && token != ''){

        if(usuarios[key].token == token){
          myUser = usuarios[key];
          id_1 = key;
        }
        if(usuarios[key].email == email && usuarios[key].token != ''){
          empleado = usuarios[key];
          id_2 = key;
        }
        if(myUser != null && empleado != null){
          break;
        }
      }
    }
    if(myUser != null && empleado == null){
        
      var now = new Date();
      if(myUser.orders == null){
        
        listaOrdenes.fechaInicial = now.getTime()
        myUser.orders = listaOrdenes;

        dataSnapshot.ref.child(id_1).set(myUser);

        myUser.token = '**********';
        myUser.password = '*********';
        res.send(myUser);
        crear = true;

        //Correo Dont

      }
      else{
        var tiempo = ((now.getTime() - myUser.orders.fechaInicial) / 1000) / 60;

        if(tiempo >= req.body.listaOrdenes.minutos){
          listaOrdenes.fechaInicial = now.getTime()
          myUser.orders = listaOrdenes;

          dataSnapshot.ref.child(id_1).set(myUser);

          myUser.token = '**********';
          myUser.password = '*********';
          res.send(myUser);
          crear = true;

          //Correo Dont
        }
        else{
          res.send('Usted no esta disponible su orden le falta unos : ' + tiempo + ' minutos');
        }
      }
    }

    if(myUser != null && empleado != null){
      
      var now = new Date();
      if(empleado.orders == null){
        
        listaOrdenes.fechaInicial = now.getTime()
        empleado.orders = listaOrdenes;

        dataSnapshot.ref.child(id_2).set(empleado);

        empleado.token = '**********';
        empleado.password = '*********';
        res.send(empleado);
        crear = true;

      }
      else{
        var tiempo = ((now.getTime() - myUser.orders.fechaInicial) / 1000) / 60;

        if(tiempo >= req.body.listaOrdenes.minutos){
          listaOrdenes.fechaInicial = now.getTime()
          empleado.orders = listaOrdenes;

          dataSnapshot.ref.child(id_2).set(empleado);

          empleado.token = '**********';
          myUser.password = '*********';
          res.send(empleado);
          crear = true;
        }
        else{
          res.send('El empleado no esta disponible tiene una orden que le falta ' + tiempo + ' minutos');
        }
      }
    }
    


  });

  if(crear = false){
    res.send('No se pudo realiza la orden');
  }

});

router.post('/read', jsonParser, async(req, res)=> {
  var token = req.body.iceCreamToken;
  var email = req.body.email;
  
  var read = false;
  var usuarios;

  var myUser;
  var empleado;

  const user = await db.ref('usuarios').once('value', (dataSnapshot)=>{
    usuarios = dataSnapshot.val();

    for (const key in usuarios) {
      if(usuarios[key].token == token && token != ''){
        myUser = usuarios[key];
      }
      if(usuarios[key].email == email && usuarios[key].token != ''){
        empleado = usuarios[key];
      }

      if(myUser != null && empleado != null){
        break;
      }
    }

    if(myUser != null && empleado == null){
      
      myUser.token = '**********';
      myUser.password = '*********';
      res.send(myUser);
      read = true;
    }
    if(myUser != null && empleado != null){
      
      empleado.token = '**********';
      empleado.password = '*********';
      res.send(empleado);
      read = true;
    }

  });

  if(read = false){
    res.send('No exite');
  }

});

router.post('/update', jsonParser, async(req, res)=> {
  var token = req.body.iceCreamToken;
  var listaOrdenes = req.body.listaOrdenes;

  var email = req.body.email;
  var myUser;
  var empleado;

  
  var update = false;
  var usuarios;

  const user = await db.ref('usuarios').once('value', (dataSnapshot)=>{
    usuarios = dataSnapshot.val();
    var id_1;
    var id_2;
    for (const key in usuarios) {

      if(req.body.listaOrdenes.minutos > 0 && token != ''){

        if(usuarios[key].token == token){
          myUser = usuarios[key];
          id_1 = key;
        }
        if(usuarios[key].email == email && usuarios[key].token != ''){
          empleado = usuarios[key];
          id_2 = key;
        }
  
        if(myUser != null && empleado != null){
          break;
        }
      }
    }
    if(myUser.orders != null && empleado == null){
        
      var now = new Date();
      var tiempo = ((now.getTime() - myUser.orders.fechaInicial) / 1000) / 60;

      if(tiempo < req.body.listaOrdenes.minutos){
        
        listaOrdenes.fechaInicial = myUser.orders.fechaInicial
        myUser.orders = listaOrdenes;

        dataSnapshot.ref.child(id_1).set(myUser);

        myUser.token = '**********';
        myUser.password = '*********';
        res.send(myUser);
        update = true;

      }
      else{
        res.send('El empleado no esta disponible tiene una orden que le falta ' + tiempo + ' minutos');
      }

      
    }
    if(myUser != null && empleado.orders != null){
      
      var now = new Date();
      var tiempo = ((now.getTime() - myUser.orders.fechaInicial) / 1000) / 60;

      if(empleado.orders != null && tiempo < req.body.listaOrdenes.minutos){
       
        listaOrdenes.fechaInicial = empleado.orders.fechaInicial
        empleado.orders = listaOrdenes;

        dataSnapshot.ref.child(id_2).set(empleado);

        empleado.token = '**********';
        empleado.password = '*********';
        res.send(empleado);
        update = true;
      }
      else{
        res.send('El empleado no esta disponible tiene una orden que le falta ' + tiempo + ' minutos');
      }

     
    }

  });

  if(update = false){
    res.send('No tienes ordenes que actualizar');
  }

});

router.post('/delete', jsonParser, async(req, res)=> {
  var token = req.body.iceCreamToken;
  
  var eliminar = false;
  var usuarios;

  const user = await db.ref('usuarios').once('value', (dataSnapshot)=>{
    usuarios = dataSnapshot.val();

    for (const key in usuarios) {
      if(usuarios[key].token == token && token != ''){
        
        myUser = usuarios[key];
        
        if(myUser.orders != null){
          myUser.orders = null;
          
          dataSnapshot.ref.child(key).set(myUser);
          res.send('Se ha eliminado las ordenes');
          eliminar = true;
        }
        break;
      }
    }
  });

  if(eliminar = false){
    res.send('No tienes ordenes que Eliminar');
  }

});


module.exports = router;
