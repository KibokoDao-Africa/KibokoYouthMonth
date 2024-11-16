const bcrypt = require('bcryptjs');

const saltRounds = 10;

const userModel = require('../models/users');
const {successResponse, errorResponse} = require('../lib/response');
const { validateUserRegister, validateUserToken, validateUserRole, validateUserPermission,   validateAuth, validateSeller } = require('../validators/users');
const { validateId} = require('../validators/common');

const logStruct = (func, error) => {
  return {'func': func, 'file': 'userController', error}
}

const createUser = async (reqData) => {
  try {
    const validInput = validateUserRegister(reqData);
    const userExists = await userModel.getUserDetailsByEmail(validInput.email);
    if (userExists && userExists.length) {
      return errorResponse(403, 'userExists');
    }
    validInput.password = bcrypt.hashSync(String(validInput.password), saltRounds);
    const resp = await userModel.createUser(validInput);
    await userModel.createPermission({user_id: resp[0], role_id: reqData.role_id});
    const response = await userModel.fetchUserName(resp[0]);
    let token_data = {};
    token_data.user_name = validInput.email;
    token_data.password = resp[0];
    const new_token = await userModel.genToken(token_data);
    await userModel.createUserToken(new_token);
    return successResponse(201, response, { user_roles: ['customer'], email: validInput.email}, 'userRegistered')
  } catch (error) {
    console.error('error -> ', logStruct('createUser', error))
    return errorResponse(error.status, error.message);
  }
};

const updatePassword = async (reqData) => {
  try {
    const userExists = await userModel.getUserDetailsByEmail(reqData.email);
    if (userExists && userExists.length) {
      reqData.password = bcrypt.hashSync(String(reqData.password), saltRounds);
      const response = await userModel.updatePassword(reqData);
      return successResponse(204, 'passwordUpdated')
    }
    else{
    return errorResponse(403, 'userNotRegistered');
  }
  } catch (error) {
    console.error('error -> ', logStruct('updatePassword', error))
    return errorResponse(error.status, error.message);
  }
};

const updateProfile = async (reqData) => {
  try {
    const userExists = await userModel.getUserDetailsByEmail(reqData.email);
    if (userExists && userExists.length) {
      const response = await userModel.updateProfile(reqData);
      return successResponse(204, 'profileUpdated')
    }
    else{
    return errorResponse(403, 'userNotRegistered');
  }
  } catch (error) {
    console.error('error -> ', logStruct('updateProfile', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchUser = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await userModel.getDetailsById(validInput.id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchUser', error))
    return errorResponse(error.status, error.message);
  }
};

const createUserPermission = async (reqData) => {
  try {
    const validInput = validateUserPermission(reqData);
    const response = await userModel.createPermission(validInput);
    return successResponse(201, response)
  } catch (error) {
    console.error('error -> ', logStruct('createUserPermission', error))
    return errorResponse(error.status, error.message);
  }
};

const createUserRole = async (reqData) => {
  try {
    const validInput = validateUserRole(reqData);
    const response = await userModel.createUserRole(validInput);
    return successResponse(201, response)
  } catch (error) {
    console.error('error -> ', logStruct('createUserRole', error))
    return errorResponse(error.status, error.message);
  }
};


const activateUser = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await userModel.activeUser(validInput.id);
    return successResponse(204, 'activated')
  } catch (error) {
    console.error('error -> ', logStruct('activateUser', error))
    return errorResponse(error.status, error.message);
  }
};

const deActivateUser = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await userModel.deActiveUser(validInput.id);
    return successResponse(204, 'flagged')
  } catch (error) {
    console.error('error -> ', logStruct('deActivateUser', error))
    return errorResponse(error.status, error.message);
  }
};

const verifySeller = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await userModel.verifySeller(validInput.id);
    return successResponse(204, 'verified')
  } catch (error) {
    console.error('error -> ', logStruct('verifySeller', error))
    return errorResponse(error.status, error.message);
  }
};


const activateSeller = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await userModel.activeSeller(validInput.id);
    return successResponse(204, 'activated')
  } catch (error) {
    console.error('error -> ', logStruct('activateSeller', error))
    return errorResponse(error.status, error.message);
  }
};

const deActivateSeller = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await userModel.deActiveSeller(validInput.id);
    return successResponse(204, 'flagged')
  } catch (error) {
    console.error('error -> ', logStruct('deActivateSeller', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchAllUsers = async () => {
  try {
    //const validInput = validateId(reqData);
    const response = await userModel.getAllUsers();
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchAllUsers', error))
    return errorResponse(error.status, error.message);
  }
};

const loginUser = async (reqData) => {
  try {
    const validInput = validateAuth(reqData);
    const response = await userModel.getUserDetailsByNameOrEmail(validInput.user_name);
    const matched = bcrypt.compareSync(String(validInput.password), response[0].password);
    const isFlagged = await userModel.isUserIdFlagged(response[0].id);
    console.log(isFlagged[0].flag)
    if (!matched) {
      return errorResponse(401, 'wrongPassword');
    } 
    if (isFlagged[0].flag == 0){
      return errorResponse(403, 'user flagged contact admin for asistance');
    }
    await userModel.updateVerToken(response[0].email);
    const role_response = await userModel.getUserPermission(response[0].id);
    const user_roles = role_response.map(el => el.role);
    const p = successResponse(200, response, {user_roles, email: response[0].email});
    return successResponse(200, response, {user_roles, email: response[0].email})
  } catch (error) {
    console.error('error -> ', logStruct('fetchUser', error))
    return errorResponse(error.status, error.message);
  }
};

const fetchAllCustomers = async () => {
  try {
    //const validInput = validateId(reqData);
    const response = await userModel.getAllCustomers();
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchAllCustomers', error))
    return errorResponse(error.status, error.message);
  }
};

const createSeller = async (reqData) => {
  try {
    const validInput = validateSeller(reqData);
    const userExists = await userModel.getUserDetailsByEmail(validInput.email);

    if (!userExists || !userExists.length) {
      validInput.password = bcrypt.hashSync(String(validInput.password), saltRounds);
      newUser = await userModel.createUser(validInput);
      validInput.user_id = newUser[0]
    } else {
      sellerExists = await userModel.getSellerDetailsByUserId(userExists[0].id);
      if (sellerExists && sellerExists.length) {
        return errorResponse(400, 'existingSeller');
      }
      validInput.user_id = userExists[0].id;
    }

    const response = await userModel.createSeller(validInput);
    return successResponse(201, response, null, 'created')
  } catch (error) {
    console.error('error -> ', logStruct('createSeller', error))
    return errorResponse(error.status, error.message);
  }
};
function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
};

const updateSeller = async (reqData) => {
  try {
    //const validInput = validateSeller(reqData);
    const userExists = await userModel.getUserDetailsByEmail(reqData.email);
    if (userExists && userExists.length) {
      const response = await userModel.updateSeller(reqData);
      return successResponse(204, 'sellerUpdated')
    }
    else{
    return errorResponse(403, 'userNotRegistered');
  }
  } catch (error) {
    console.error('error -> ', logStruct('updateSeller', error))
    return errorResponse(error.status, error.message);
  }
}

const fetchSeller = async (reqData) => {
  try {
    const validInput = validateId(reqData);
    const response = await userModel.getSellerDetailsByUserId(validInput.id);
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchSeller', error))
    return errorResponse(error.status, error.message);
  }
};


const fetchAllSellers = async () => {
  try {
    //const validInput = validateId(reqData);
    const response = await userModel.getAllSellers();
    return successResponse(200, response)
  } catch (error) {
    console.error('error -> ', logStruct('fetchAllSellers', error))
    return errorResponse(error.status, error.message);
  }
};



const createToken = async(reqData) => {
  try {
       const token =  await userModel.genToken(reqData);
       const response = await userModel.createUserToken(token);
    return successResponse(201, response, 'token created');
} catch (error) {
  console.error('error -> ', logStruct('createToken', error))
  return errorResponse(error.status, error.message);
  }
};

const updateToken = async(reqData) => {
  try {
      const tknDetails = {};
      var token = await userModel.updateToken(reqData);
      //const validateToken = validateUserToken(token);
      tknDetails.token = token.token;
      tknDetails.message = token.message;
      tknDetails.expiry = token.expiry;
      if (tknDetails.message === 'updated'){
      const response = await userModel.createUserToken(tknDetails);
      return successResponse(201, response, 'token updated');
    }
    else{
      return successResponse(202, tknDetails , 'token valid');
    }
} catch (error) {
  console.error('error -> ', logStruct('updateToken', error))
  return errorResponse(error.status, error.message);
  }
};




module.exports = {
  createUser,
  updatePassword,
  updateProfile,
  fetchUser,
  createUserPermission,
  createUserRole,
  activateUser,
  deActivateUser,
  verifySeller,
  activateSeller,
  deActivateSeller,
  fetchAllUsers,
  loginUser,
  fetchAllCustomers,
  createSeller,
  updateSeller,
  fetchSeller,
  fetchAllSellers,
  createToken,
  updateToken
}
