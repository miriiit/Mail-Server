var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));



const config = require('./config');
const indexRoutes = require("./routes/index");
const mailRoutes = require("./routes/mail");

app.use('/', indexRoutes);
app.use('/AOF', indexRoutes);
app.use('/AOF/mail', mailRoutes)


// Use middleware to set the default Content-Type
app.use(function (req, res, next) {
  //res.setHeader('Content-Type', 'text/html');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","*");
  //res.header("Access-Allow-Control-Credentials", "false");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500).send({status:err.status || 500, message: err.message || 'internal error', type:'internal'}); 
});

let port = normalizePort(process.env.PORT || config.port);
app.set('port', port);

const env = config.env || 'production';
app.set('env',env);

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port,  () => console.log(`Example app listening on port ${port}!`));
//app.on('error', onError);
//app.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}
module.exports = app;
