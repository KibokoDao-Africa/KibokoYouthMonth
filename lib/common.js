const {errorResponse, successResponse} = require('./response');
const cache = require('./cache');
const userModel = require('../models/users');

const logStruct = (func, error) => {
  return {'func': func, 'file': 'commonLib', error}
}

exports.authenticator = async (req, res, next) => {
  try {
    if (!req.session || !req.session.email || !req.session.password || !req.session.user_roles
      || !req.session.user_roles.length) {
        return res.status(401).send(errorResponse(401));
    }

    const cacheData = await cache.get(req.sessionID);

    if (!cacheData) {
      const expiry = parseInt(process.env.SESS_LIFETIME)/1000 || 60 * 5;
      await cache.set(req.sessionID, req.session, expiry)
    };

    next();

  } catch (error) {
    console.error('error -> ', logStruct('authenticator', error))
    return res.status(401).send(errorResponse(401));
  }

}

exports.auth = async (req, res, next) => {
  try {
    const resp = await userModel.updateVerToken(req.body.email)
    console.log(resp);
    if (resp && resp.token) {
        req.session.auth = resp.token;
    }
  else {
     return res.status(401).send(errorResponse(401));
  }
    next();

  } catch (error) {
    console.error('error -> ', logStruct('auth', error))
    return res.status(401).send(errorResponse(401));
  }

}

exports.allowCustomer = (req, res, next) => {
  if (!req.session || !req.session.user_roles || !req.session.user_roles.length ||
    !req.session.user_roles.indexOf('customer') < 0) {
      return res.status(401).send(errorResponse(401));
  }
  next();
}

exports.allowAdmin = (req, res, next) => {
  if (!req.session || !req.session.user_roles || !req.session.user_roles.length ||
    !req.session.user_roles.indexOf('admin') < 0) {
      return res.status(401).send(errorResponse(401));
  }
  next();
}

/** exports.routeUser = (req, res, next) => {
  if (!req.session || !req.session.user_roles || !req.session.user_roles.length ||
    req.session.user_roles.indexOf('admin') < 0) {
      return  res.render(__dirname + "/" + "pages/admin.html");//res.status(401).send(errorResponse(401));
  }
  else if (!req.session || !req.session.user_roles || !req.session.user_roles.length ||
    req.session.user_roles.indexOf('seller') < 0) {
      return  res.render(__dirname + "/" + "pages/addProduct.html");
    }
    else{
      return  res.render(__dirname + "/" + "pages/complete_profile.html");
    }
  next();
} **/

exports.allowSeller = (req, res, next) => {
  if (!req.session || !req.session.user_roles || !req.session.user_roles.length ||
    !req.session.user_roles.indexOf('seller') < 0) {
      return res.status(401).send(errorResponse(401));
  }
  next();
}

  exports.allowAdminOrSeller = (req, res, next) => {
    if (!req.session || !req.session.user_roles || !req.session.user_roles.length || req.session.user_roles.indexOf('seller') < 0 && req.session.user_roles.indexOf('admin') < 0 ) {
        return res.status(401).send(errorResponse(401));
    }
    next();
  }
