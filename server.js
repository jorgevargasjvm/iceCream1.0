var express = require('express');
var app = express();


var morgan = require('morgan');
// parse application/x-www-form-urlencoded



// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: true })

// POST /login gets urlencoded bodies
// app.post('/login', urlencodedParser, function (req, res) {
//   res.send('welcome, ' + req.body.name)
//   console.log(req.body.name);
// })

//setting
app.use(morgan('dev'));




// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



// create application/json parser
