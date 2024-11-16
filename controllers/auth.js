const jwt = require('jsonwebtoken');
///const userModel = require('../models/users');
require('dotenv').config()

const nodemailer = require('nodemailer');
const {successResponse, errorResponse} = require('../lib/response');
const userModel = require('../models/users');
const logStruct = (func, error) => {
  return {'func': func, 'file': 'authController', error}
}



/**
var token =  req.body.token;//localStorage.getItem('auth_token_agroAfric');req.headers['x-access-token'];
var resp = {auth : false, message : 'No Token Provided'};
if(!token) res.status(500).send(resp);
jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded){
  var resp = {auth : false, message : 'Failed to authenticate Token'};
  if (err) res.status(500).send(resp);
  next()
});
const transport = nodemailer.createTransport({
    service: 'gmail',
    ///secure: true,
    auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS
    }
}); **/



const sendVerification = async (reqData) => {
  try {
   //let testAccount = await nodemailer.createTestAccount();
    const {token , user, email} = reqData;
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_USER_PASSWORD, // generated ethereal password
      },
    });
    const AUTH_URL = `http://localhost:5000/agroAfrica/v1/user/verify`;
    const link = `${AUTH_URL}/${email}/${token}`;
    console.log(link);
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Verification 👻" <no-reply@agro-africa.io>', // sender address
      to: email, //"nostrakelvin@gmail.com" // list of receivers
      subject: "Please Verify Your agro-africa Account ✔", // Subject line
      text: "Hello" + user , // plain text body
      html: "Hello" + user +",<br> Please Click on the link to verify your agro-africa account email.<br><a href="+link+">Click here to verify your email</a>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return successResponse(200, info, 'sent')
  } catch (error) {
    console.error('error -> ', logStruct('sendVerfication', error))
    return errorResponse(error.status, error.message);
  }
};

const generateToken = async(reqData) => {
  try {
       const token =  await userModel.genVerToken(reqData);
       const response = await userModel.createEmailToken(token);
       var respToken = {
         token : token
         //email : reqData.email,
         //user : reqData.user
       }
    return successResponse(201, respToken, 'created');
} catch (error) {
  console.error('error -> ', logStruct('generateToken', error))
  return errorResponse(error.status, error.message);
  }
};

const verifyToken = async(token) => {
  try {
       //const token =  await userModel.genVerToken(token);
    var data = {};
    data.email = token.email;
    data.verified = 1;
    const response = await userModel.verifyToken(token);
    token.used = 1;
    await userModel.verifyEmailToken(token);
    await userModel.verifyEmail(data);
    return successResponse(202, response, 'verified');
} catch (error) {
  console.error('error -> ', logStruct('verifyToken', error))
  return errorResponse(error.status, error.message);
  }
};

/*const getSession = async(session) => {
  try {
       //const token =  await userModel.genVerToken(token);
    const response = await JSON.parse(session.cookie);
    return successResponse(200, response, 'fetched');
} catch (error) {
  console.error('error -> ', logStruct('getSession', error))
  return errorResponse(error.status, error.message);
  }
}; **/


module.exports = {
  sendVerification,
  generateToken,
  verifyToken
  //getSession
};
