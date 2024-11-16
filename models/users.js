// const userDb = require('../db/users');
// const orderDb = require('../db/orders');
// const productDb = require('../db/products');

const db = require('../models/db');
const moment = require('moment');
const validateDetails = require('../validators/users');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');
require('dotenv').config()

// const bcrypt = require('bcrypt');
// const saltRounds = 10;

exports.getDetailsById = async (id) => {
  const query = db.read.select('*')
  .from('users')
  .where('id', '=', id);;
  return query;
};

exports.getUserDetailsByEmail = async (email) => {
  const query = db.read.select('*')
  .from('users')
  .where('email', '=', email);
  return query;
};

exports.getUserDetailsByNameOrEmail = async (input) => {
  const query = db.read.select('*')
  .from('users')
  .where('name', '=', input)
  .orWhere('email', '=', input);
  return query;
};

exports.createUser = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('users').insert({
    name: data.name || null,
    email: data.email || null,
    password: data.password || null,
    about_me: data.about|| null,
    phone: data.phone || null,
    verified_email: data.verified_email || 0,
    verified_phone: data.verified_phone || 0,
    DOB: data.DOB || null,
    street: data.street || null,
    city: data.city || null,
    zipcode: data.zipcode || null,
    state: data.state || null,
    country: data.country || null,
    picture: data.picture || null,
    latitude: data.latitude || null,
    longitude: data.longitude || null,
    flag:1,
    created_at: createdAt,
    updated_at: createdAt
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.updatePassword = async (data) => {
  const query = db.write('users')
    .where('email', data.email)
    .update({
    password : data.password,
    updated_at : moment().format('YYYY-MM-DD HH:mm:ss')
  });
  console.info("query -->", query.toQuery())
  return query;
};

 exports.fetchUserName = async (id) => {
   const query = db.read.select('users.name')
   .from('users')
   .where('id', '=', id);;
   return query;
 };

exports.updateProfile = async (data) => {
  const query = db.write('users')
    .where('email', data.email)
    .update({
      about_me: data.about,
      phone : data.telephone,
      street : data.street,
      city : data.city,
      zipcode : data.zipcode,
      state : data.state,
      country : data.country,
      latitude : data.latitude,
      longitude : data.logitude,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    });
  console.info("query -->", query.toQuery())
  return query;
};

exports.verifyEmail = async (data) => {
  const query = db.write('users')
    .where('email', data.email)
    .update({
    verified_email : data.verified || 1,
    updated_at : moment().format('YYYY-MM-DD HH:mm:ss')
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.verifySeller = async (id) => {
  const query = db.write('seller')
    .where('id', id)
    .update({
    verified_account :  1,
    updated_at : moment().format('YYYY-MM-DD HH:mm:ss')
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.deActiveUser = async (id) => {
  const query = db.write('users')
    .where('id', id)
    .update({
    flag : 0,
    updated_at : moment().format('YYYY-MM-DD HH:mm:ss')
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.activeUser = async (id) => {
  const query = db.write('users')
    .where('id', id)
    .update({
    flag : 1,
    updated_at : moment().format('YYYY-MM-DD HH:mm:ss')
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.deActiveSeller = async (id) => {
  const query = db.write('seller')
    .where('id', id)
    .update({
    flag : 0,
    updated_at : moment().format('YYYY-MM-DD HH:mm:ss')
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.activeSeller = async (id) => {
  const query = db.write('seller')
    .where('id', id)
    .update({
    flag : 1,
    updated_at : moment().format('YYYY-MM-DD HH:mm:ss')
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.getAllUsers = async () => {
  const query = db.read.select('*')
  .from('users');

  return query;
};

exports.isUserIdFlagged = async (user_id) => {
  const query = db.read.select('users.flag')
  .from('users')
  .where('id', '=', user_id);

  return query;
};

exports.createSeller = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('seller').insert({
    user_id: data.user_id || null,
    name: data.name || null,
    about_us: data.about || null,
    email: data.email || null,
    phone: data.phone || null,
    verified_phone: data.verified_phone || 0,
    verified_email: data.verified_email || 0,
    verified_account: data.verified_account || 0,
    DOB: data.DOB || null,
    street: data.street || null,
    city: data.city || null,
    zipcode: data.zipcode || null,
    state: data.state || null,
    country: data.country || null,
    logo: data.logo || null,
    latitude : data.latitude,
    longitude : data.logitude,
    flag : 1,
    created_at: createdAt,
    updated_at: createdAt
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.getSellerDetailsByUserId = async (user_id) => {
  const query = db.read.select('*')
  .from('seller')
  .where('user_id', '=', user_id);
  return query;
};

exports.updateSeller = async (data) => {
  const query = db.write('seller')
    .where('email', data.email)
    .update({
      about_us: data.about,
      phone : data.telephone,
      street : data.street,
      city : data.city,
      zipcode : data.zipcode,
      state : data.state,
      country : data.country,
      latitude : data.latitude,
      longitude : data.logitude,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    });
  console.info("query -->", query.toQuery())
  return query;
};

exports.getAllSellers = async () => {
  const query = db.read.select('*')
  .from('seller');

  return query;
};

exports.getAllCustomers = async () => {
  const query = db.read.select('users.*')
  .from('users')
  .join('user_permission','user_permission.user_id','=','users.id')
  //.where('carts.user_id', '=', user_id)
  .where('user_permission.role_id', '=', 2);
  return query;
};

exports.createPermission = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('user_permission').insert({
    user_id: data.user_id,
    role_id: data.role_id || 3,
    created_at: createdAt,
    updated_at: createdAt
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.getUserPermission = async (user_id) => {
  const query = db.read.select('user_role.role')
  .from('user_permission')
  .join('user_role', 'user_permission.role_id', '=', 'user_role.id')
  .where('user_id', '=', user_id)
  console.info("query -->", query.toQuery())
  return query;
};

exports.createUserRole = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('user_role').insert({
    role: data.role,
    created_at: createdAt,
    updated_at: createdAt
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.getUserPermission = async (user_id) => {
  const query = db.read.select('user_role.role')
  .from('user_permission')
  .join('user_role', 'user_permission.role_id', '=', 'user_role.id')
  .where('user_id', '=', user_id)
  console.info("query -->", query.toQuery())
  return query;
};

exports.createUserToken = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('invalid_token').insert({
    user_id : data.user_id,
    token: data.token,
    expiry: data.expiry,
    created_at: createdAt,
    updated_at: createdAt
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.updateUserToken = async (data) => {
  const query = db.write('invalid_token')
    .where('user_id', data.user_id)
    .update({
      token : data.token,
      expiry : data.expiry,
      updated_at : moment().format('YYYY-MM-DD HH:mm:ss')
    });
  console.info("query -->", query.toQuery())
  return query;
};

exports.getUserTokenByUserId = async (user_id) => {
  const query = db.read.select('invalid_token.token', 'invalid_token.expiry')
  .from('invalid_token')
  .where('user_id', '=', user_id)
  console.info("query -->", query.toQuery())
  return query;
};

exports.createEmailToken = async (data) => {
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const query = db.write('authentication').insert({
    user_id : data.user_id,
    email : data.email,
    token : data.token,
    expiration : data.expiry,
    createdAt : createdAt,
    updatedAt : createdAt,
    used : data.used || 0
  });
  console.info("query -->", query.toQuery())
  return query;
};

exports.verifyEmailToken = async (data) => {
  const query = db.write('authentication')
    .where('token', data.token)
    .update({
      used : data.used || 1,
      updatedAt : moment().format('YYYY-MM-DD HH:mm:ss')
    });
  console.info("query -->", query.toQuery())
  return query;
};

 exports.genAuthToken = function (user,pass){
   try{
  var tk = {};
   jwt.sign({
     data: {
       email: user,
       password: pass
     }
   }, process.env.SECRET_TOKEN , { expiresIn: '720h' }, (err, decoded) =>{
     if(err) {
        tk.error = err.message;
        return tk;
     }
     else{
     tk.token = decoded;
     //console.log(tk)

   }
 })
return tk;
}
catch(err){
      tk.error = err.message;
      return  err.message;
}
}

exports.genEmailToken = function (user,pass){
  try{
 var tk = {};
  jwt.sign({
    data: {
      email: user,
      password: pass
    }
  }, process.env.SECRET_TOKEN , { expiresIn: '24h' }, (err, decoded) =>{
    if(err) {
       tk.error = err.message;
       return tk;
    }
    else{
    tk.token = decoded;
    //console.log(tk)

  }
})
return tk;
}
catch(err){
     tk.error = err.message;
     return  err.message;
}
}

 function getExpDate(tkn){
  try{
   var tokenVer = {};
  jwt.verify(tkn, process.env.SECRET_TOKEN, (err, decoded) => {
    if(err) {
       tokenVer.error = err.message;
       return tokenVer;
    }
    else{
    tokenVer.data = decoded;
    //console.log(tokenVer)


  }
})
return tokenVer;
//console.log(tokenVer);
}
catch(err){
 tokenVer.error = err.message;
     return tokenVer;
}
}
 function sleep(ms){
   return new Promise(resolve => setTimeout(resolve, ms));
 }

exports.genToken = async (reqData) => {
  const validInput = validateDetails.validateAuth(reqData);
  const userExists = await userModel.getUserDetailsByEmail(validInput.user_name);
  var token = {};
  if (userExists && userExists.length) {
    var tkn = await userModel.genAuthToken(userExists[0].email, userExists[0].id);
    await sleep(1000);
   if (tkn){
     var tkExp = await getExpDate(tkn.token);
     await sleep(1000);
     console.log(tkExp);
     token.expiry = tkExp.data.exp;
     token.token = tkn.token;
     token.user_id = userExists[0].id;
      console.log(token);
   }
// }
return token;
}

}

exports.updateToken = async (reqData) => {
  const userExists = await userModel.getUserDetailsByEmail(reqData);
  if (userExists && userExists.length){
  var token = {};
  var input = {};
  input.user_id = userExists[0].id;
  var currentToken = await userModel.getUserTokenByUserId(userExists[0].id);

  /** const getToken = await userModel.genAuthToken(userExists[0].email, userExists[0].password);
   await sleep(1000);
   //console.log(getToken)
  var tknExp = await getExpDate(getToken.token);
  await sleep(1000);
  //console.log(tknExp)  tknExp.data.exp  tknExp.data.exp  **/
  var timeNow = Math.floor(Date.now() / 1000);
  console.log(timeNow)
  if (currentToken && currentToken.length){
    console.log(currentToken);
  if(currentToken[0].expiry <= timeNow){
    var newToken = await userModel.genAuthToken(userExists[0].email, userExists[0].id);
     await sleep(1000);
     if (newToken){
       var tkExp = await getExpDate(newToken.token);
       await sleep(1000);
       //console.log(tkExp);
       token.expiry = tkExp.data.exp;
       token.token = newToken.token;
       //token.message = 'updated';
       input.token = newToken.token;
       input.expiry = tkExp.data.exp;
       const response = await userModel.updateUserToken(input);
       if (response && response.length){
         token.message = 'updated';
       }
     }
     return token;
   }
   else  {
     token.message = 'valid';
     token.expiry = currentToken[0].expiry;
     token.token = currentToken[0].token;
      //console.log(token);
     return token;
   }
    }
  else{
    var initToken = await userModel.genAuthToken(userExists[0].email, userExists[0].id);
     await sleep(1000);
     if (initToken){
       var tkInitExp = await getExpDate(initToken.token);
       await sleep(1000);
       //console.log(tkExp);
       token.expiry = tkInitExp.data.exp;
       token.token = initToken.token;
       //token.message = 'updated';
       input.token = initToken.token;
       input.expiry = tkInitExp.data.exp;
       const response = await userModel.createUserToken(input);
       if (response && response.length){
         token.message = 'created';
       }
       return token;
  }
}
}
}

exports.updateVerToken = async (reqData) => {
  const userExists = await userModel.getUserDetailsByEmail(reqData);
  if (userExists && userExists.length){
  var token = {};
  var input = {};
  input.user_id = userExists[0].id;
  var currentToken = await userModel.getUserTokenByUserId(userExists[0].id);
  var timeNow = Math.floor(Date.now() / 1000);
  if (currentToken.length > 0){
   console.log(currentToken);
  let _expiry = currentToken[0].expiration;
  let _token = currentToken[0].token;
  let checkId = await userModel.verifyGenToken(_token);
  let _checkId = checkId.password;
  let _id = userExists[0].id;
  //console.log(_checkId, _id, _expiry, _token);
  let isNum = isNaN(_checkId);
  if(_expiry <= timeNow || _checkId != _id){
    var newToken = await userModel.genAuthToken(userExists[0].email, userExists[0].id);
     await sleep(1000);
     if (newToken){
       var tkExp = await getExpDate(newToken.token);
       await sleep(1000);
       //console.log(tkExp);
       token.user_id = userExists[0].id;
       token.expiration = tkExp.data.exp;
       token.token = newToken.token;
       //token.message = 'updated';
       input.user_id = userExists[0].id;
       input.token = newToken.token;
       input.expiration = tkExp.data.exp;
       const response = await userModel.updateUserToken(input);
       if (response && response.length){
         token.message = 'updated';
       }
     }
     return token;
   }

   else  {
     token.user_id = userExists[0].id;
     token.message = 'valid';
     token.expiration = currentToken[0].expiration;
     token.token = currentToken[0].token;
      //console.log(token);
     return token;
   }
    }
 else {
    var initToken = await userModel.genAuthToken(userExists[0].email, userExists[0].id);
     await sleep(1000);
     if (initToken){
       var tkInitExp =  getExpDate(initToken.token);
       await sleep(1000);
       //console.log(tkExp);
       token.user_id = userExists[0].id;
       token.expiration = tkInitExp.data.exp;
       token.token = initToken.token;
       //token.message = 'updated';
       input.user_id = userExists[0].id;
       input.token = initToken.token;
       input.expiration = tkInitExp.data.exp;
       const response = await userModel.createUserToken(input);
       if (response && response.length){
         token.message = 'created';
       }
       return token;
  }
}
}
}


exports.genVerToken = async (reqData) => {
  const validInput = validateDetails.validateEmailAuth(reqData);
  const userExists = await userModel.getUserDetailsByEmail(validInput.email);
  var token = {};
  if (userExists && userExists.length) {
    var tkn = await userModel.genEmailToken(userExists[0].email, userExists[0].password);
    await sleep(1000);
   if (tkn){
     var tkExp = await getExpDate(tkn.token);
     await sleep(1000);
     console.log(tkExp);
     token.user_id = userExists[0].id;
     token.email = userExists[0].email;
     token.expiry = tkExp.data.exp;
     token.token = tkn.token;
     token.used = 0;
     console.log(token);
   }
// }
return token;
}
}

exports.verifyToken = async (token, id) => {
  try{
   var valid = false;
   var resp = {};
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if(err) {
       resp.token = token;
       resp.valid = valid;
       resp.message = "error";
       return resp;
    }
    else{
    //tokenVer.
    var data = decoded;
    console.log(data);
    var expiry = data.exp;//getExpDate(token);
    //await sleep(1000);
    
    var timeNow = Math.floor(Date.now() / 1000);
    if (expiry <= timeNow){
      valid = true;
      resp.token = token;
      resp.valid = valid;
      resp.message = "expired";
    }
    else {
      valid = true;
      resp.token = token;
      resp.valid = valid;
      resp.message = "valid";
    }

  }
})
return resp;
//console.log(tokenVer);
}
catch(err){
  resp.token = token;
  resp.valid = valid;
  resp.message = "error";
  return resp;
}
}


exports.verifyGenToken = async (token) => {
  try{
   var valid = false;
   var resp = {};
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if(err) {
       resp.token = token;
       resp.expiry = 0;
       resp.valid = valid;
       resp.phone = token;
       resp.password = token;
       resp.message = "error";
       return resp;
    }
    else{
    //tokenVer.
    var data = decoded;
    console.log(data);
    var expiration = data.exp;//getExpDate(token);
    //await sleep(1000);
    let _phone = data.data.phone;
    let _password = data.data.password;
    var timeNow = Math.floor(Date.now() / 1000);
    if (expiration <= timeNow){
      valid = true;
      resp.token = token;
      resp.expiry = expiration;
      resp.valid = valid;
      resp.phone = _phone;
      resp.password = _password;
      resp.message = "expired";
    }
    else {
      valid = true;
      resp.token = token;
      resp.expiry = expiration;
      resp.valid = valid;
      resp.phone = _phone;
      resp.password = _password;
      resp.message = "valid";
    }

  }
})
return resp;
//console.log(tokenVer);
}
catch(err){
  resp.token = token;
  resp.expiry = 0;
  resp.valid = valid;
  resp.phone = token;
  resp.password = token;
  resp.message = "error";
  return resp;
}
}