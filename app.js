const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const fileupload = require('express-fileupload')
//app.use(express.static(__dirname + '/public'))
require('dotenv').config();

const SESS_LIFETIME = parseInt(process.env.SESS_LIFETIME) || 1000 * 60 * 60 * 48;
// const SESS_LIFETIME = 1000 * 60 * 5;

const DEBUG = process.env.DEBUG || false;
if(!DEBUG){
  console.info = () => {}
}


const app = express();

app.use(cors());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/pages')));
app.use("/styles", express.static(path.join(__dirname, '/pages/css')));
app.use("/images", express.static(path.join(__dirname, '/pages/assets')));
app.use("/scripts", express.static(path.join(__dirname, '/pages/js')));
app.use(
  session({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET || '!~$^%%#%^&***(()))*&&',
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: process.env.NODE_ENV === 'production'
    }
  })
);

app.use(fileupload());
// routes
const indexRoutes = require('./routes/index')
app.use('/agroAfrica/v1/index', indexRoutes);
const userRoutes = require('./routes/users')
app.use('/agroAfrica/v1/user', userRoutes);
const productRoutes = require('./routes/products')
app.use('/agroAfrica/v1/product', productRoutes);
const orderRoutes = require('./routes/orders')
app.use('/agroAfrica/v1/order', orderRoutes);
const transactRoutes = require('./routes/transactions')
app.use('/agroAfrica/v1/transactions', transactRoutes);
const uploadRoute = require('./routes/upload');
app.use('/agroAfrica/v1/upload', uploadRoute);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).send({
    success : false,
    message : 'notFound',
    type : 'agroAfrica Srv',
    action: req.method+' '+req.originalUrl,
    data : [],
    meta:{}
  });
});

// error handler
app.use((err, req, res, next) => {
  if(err && err.status==520){
    return next();
  }
  console.error({
    type : 'uncaughtException',
    err:err
  }, 'agroAfrica uncaughtException');
  res.status(520).send({
    success : false,
    message : 'somethingWentWrong',
    type : 'agroAfrica Srv',
    action: 'uncaughtException'
  });
});


module.exports = app;
