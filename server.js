var express = require('express');
var app = express();

var morgan = require('morgan');
//routes Api
var loginRouter = require('./src/routes/login');
var ordenRouter = require('./src/routes/orden');

//setting
app.use(morgan('dev'));
app.use('/user', loginRouter);
app.use('/orden', ordenRouter);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
