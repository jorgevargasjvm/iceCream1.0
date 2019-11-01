var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const admin = require('../firebase/firedase');
var db = admin.database();

router.post('/', jsonParser, (req, res)=> {
  res.send('API Usuarios');
});

router.post('/crear/usuario', jsonParser,async (req, res)=> {
  var crear = true;
  var usuarios;
 
  const fightRef = await db.ref('usuarios').once('value', (dataSnapshot)=>{
    usuarios = dataSnapshot.val();
  })

  for (const key in usuarios) {
    // console.log(usuarios[key].email);
    if(usuarios[key].email == req.body.email){
      crear = false;
      console.log(usuarios[key].email);
      console.log(crear);
      break;
    }
    
  }
  if(crear){
    //xxxx
    var User = {
      token: "",
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      orders: {},
      ordersPack: {},
    }
    db.ref('usuarios').push(User);
    res.send(User);
  }
  else{
    res.send('Email no valido');
  }
});

router.post('/read/usuario', jsonParser,async (req, res)=> {
  var read = false;
  var token = req.body.iceCreamToken;
  var usuarios;
  var myUser;
 
  const readUsuarios = await db.ref('usuarios').once('value', (dataSnapshot)=>{
    usuarios = dataSnapshot.val();

    for (const key in usuarios) {
      // console.log(usuarios[key].email);
      if(usuarios[key].token == token && token != ''){
        read = true;
        myUser = usuarios[key];
        break;
      }
      
    }
    if(read){
      res.send(myUser);
    }
    else{
      res.send('No has iniciado seccion');
    }
  });

  
});

router.post('/update/usuario', jsonParser,async (req, res)=> {
  var update = false;
  
  var usuarios;
  var myUser;
 
  const updateUsuarios = await db.ref('usuarios').once('value', (dataSnapshot)=>{
    usuarios = dataSnapshot.val();

    for (const key in usuarios) {
      // console.log(usuarios[key].email);
      if(usuarios[key].token == req.body.iceCreamToken && req.body.iceCreamToken != '' && usuarios[key].email ==req.body.email){
        update = true;
        myUser = usuarios[key];

        if(req.body.token){
          myUser.token = req.body.token;
        }
        if(req.body.name){
          myUser.name = req.body.name;
        }
        if(req.body.email){
          myUser.email = req.body.email;
        }
        if(req.body.password){
          myUser.password = req.body.password;
        }
        if(req.body.orders){
          myUser.orders = req.body.orders;
        }
        if(req.body.ordersPack){
          myUser.ordersPack = req.body.ordersPack;
        }
        dataSnapshot.ref.child(key).set(myUser);
        break;
      }
    }
    
    if(update){
      res.send('The User was update');
    }
    else{
      res.send('No has iniciado seccion');
    }
  })

  
});

router.post('/delete/usuario', jsonParser,async (req, res)=> {
  var remove = false;
  var usuarios;

  const deleteUser = await db.ref('usuarios').once('value', (dataSnapshot)=>{
    usuarios = dataSnapshot.val();

    for (const key in usuarios) {
      // console.log(usuarios[key].email);
      if(usuarios[key].email == req.body.email && usuarios[key].password == req.body.password){
        remove = true;
       
        dataSnapshot.ref.child(key).remove()
          .then(function() {
            console.log("Remove succeeded.")
            res.send('The User was delete');
          })
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
            res.send(("Remove failed: " + error.message));
          });
        break;
      }
    }

    if(remove == false){
      res.send('No has iniciado seccion');
    }
   
  })

  
});

router.post('/login',  jsonParser,async (req, res)=> {
  var email = req.body.email;
  var password = req.body.password;
  var login = false;

  var user;
  var token = {iceCreamToken: "",}

  var usuarios;
 
  const jsonUser = await db.ref('usuarios').once('value', (dataSnapshot)=>{
    usuarios = dataSnapshot.val();

    for (const key in usuarios) {
      // console.log(usuarios[key].email);
      if(usuarios[key].email == email && usuarios[key].password == password){
        user = usuarios[key];
        var newToken =  Math.random().toString(36).substr(2); // remove `0.`
        user.token = newToken;
        
        
        dataSnapshot.ref.child(key).update(user);
        token.iceCreamToken = newToken;
        res.send(token);
        login = true;
        break;
      }
      
    }

  })
  if(login == false){
    res.send('Error Email and password');
  }
  
  
});

router.post('/close/login',  jsonParser,async (req, res)=> {
  var token = req.body.iceCreamToken;

  const jsonUser = await db.ref('usuarios').once('value', (dataSnapshot)=>{
    usuarios = dataSnapshot.val();

    for (const key in usuarios) {
      // console.log(usuarios[key].email);
      if(usuarios[key].token == token){
        user = usuarios[key];
        var newToken =  ''; // remove `0.`
        user.token = newToken;
        
        
        dataSnapshot.ref.child(key).update(user);
        token.iceCreamToken = newToken;
        res.send('close');
        break;
      }
      
    }

  })
});


module.exports = router;