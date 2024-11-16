'use strict';

const express  = require('express');
const router  = express.Router();
const userController = require('../controllers/users');
const {authenticator, auth, allowCustomer,  allowAdmin, allowSeller, allowAdminOrSeller} = require('../lib/common');
const path = require('path');
const authController = require('../controllers/auth');
const url = require('url');

//const createAuthToken = require('../models/users');
// CRUD user
router.post('/register',  async (req, res) => {
  const response = await userController.createUser(req.body);
  
  if (response.success && response.meta) {
    req.session.email = response.meta.email;
    req.session.password = req.body.password;
    req.session.user_roles = response.meta.user_roles;
  }
  const regToken = await authController.generateToken(req.body);
    /**    var packageReq = {
         token : regToken.data.token.token,
         email : regToken.data.token.email,
         user : req.body.name
       }
      await authController.sendVerification(packageReq); **/
  return res.status(response.status).send(response)
});

router.get('/fetch/:id', authenticator, async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await userController.fetchUser(req.body)
  return res.status(response.status).send(response)
});

router.post('/updatePassword', auth, async (req, res) => {
  const response = await userController.updatePassword(req.body)
  return res.status(response.status).send(response)
})

router.post('/updateProfile', authenticator, allowCustomer, async (req, res) => {
  const response = await userController.updateProfile(req.body)
  return res.status(response.status).send(response)
})

router.get('/users', authenticator, allowAdmin,  async (req, res, next) => {
  const response = await userController.fetchAllUsers();
  return res.status(response.status).send(response)
})

router.post('/permission', authenticator, allowAdmin,  async (req, res) => {
  const response = await userController.createUserPermission(req.body);
  return res.status(response.status).send(response)
});

router.post('/role', authenticator, allowAdmin, async (req, res) => {
  const response = await userController.createUserRole(req.body);
  return res.status(response.status).send(response)
});

// authenticator

router.post('/createToken', authenticator, async (req, res) => {
  const response = await userController.createToken(req.body)
  return res.status(response.status).send(response)
})

router.post('/generateAuth', async (req, res) => {
  const response = await authController.generateToken(req.body);
  return res.status(response.status).send(response);
})

router.post('/sendAuth', async (req, res) => {
  const response = await authController.sendVerification(req.body);
  return res.status(response.status).send(response);
})

router.get('/verify/:email/:token', async (req, res) => {
  var token = req.params.token;
  var email = req.params.email;
  var packageToken = {
    token : token,
    email : email
  }
 await authController.verifyToken(packageToken);
  //return res.status(response.status).send(response)
  //console.log(response);

function getFormattedUrl(req) {
    return url.format({
        protocol: req.protocol,
        host: 'agro-africa.io'//req.get('host')
    });
}

res.redirect(getFormattedUrl(req));
  //res.redirect('/home');

})

router.post('/login',  async (req, res) => {
  const response = await userController.loginUser(req.body);
  if (response.success && response.meta) {
    req.session.email = response.meta.email;
    req.session.password = req.body.password;
    req.session.user_roles = response.meta.user_roles;
  }

  return res.status(response.status).send(response)
  if (req.session.user_roles.indexOf('admin') >= 0) {
        //res.status(response.status).send(response)
        //res.sendFile(path.join(__dirname, '../pages' , 'add_category.html'));
        res.redirect('/admin/profile/:id/');

  }
  else if (req.session.user_roles.indexOf('seller') >= 0) {
       res.redirect('/seller/profile/:id/');
    }
  else if (req.session.user_roles.indexOf('customer') >= 0) {
      res.redirect('/customer/profile/:id/');
    }
  else {
      //res.status(401).send(response);
      res.redirect('/');
    }
    //res.redirect('/profile/:id/')

});

router.post('/logout', authenticator, async (req, res) => {
  req.session.destroy(err => {
    res.clearCookie('sid')
    return res.status(200).send('loggedout');
  })
});

/** router.get('/getSession', authenticator, async (req, res) => {
  var response = await authController.getSession(req.session);
  console.log(response);
  return res.status(200).send(response);

}); **/

router.post('/seller', authenticator, async (req, res) => {
  const response = await userController.createSeller(req.body)
  return res.status(response.status).send(response)
})

router.get('/fetchSeller/:id', authenticator, allowSeller, async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await userController.fetchSeller(req.body)
  return res.status(response.status).send(response)
});

router.get('/fetchSellers', authenticator, allowAdmin, async (req, res) => {
  const response = await userController.fetchAllSellers()
  return res.status(response.status).send(response)
});

router.post('/updateSeller', authenticator, allowSeller, async (req, res) => {
  const response = await userController.updateSeller(req.body)
  return res.status(response.status).send(response)
})


/** router.post('/updateToken', async (req, res) => {
  const response = await userController.updateToken(req.body)
  return res.status(response.status).send(response)
  //res.redirect('/profile/:id/');
}) **/

router.get('/home', async (req, res) => {
  //req.body.id = Number(req.params.id);
  //const response = await userController.fetchSeller(req.body)
  res.sendFile(path.join(__dirname, '../pages' , 'index.html'));
});

router.get('/user/:id/addWarehouse', authenticator, allowAdminOrSeller, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'add_warehouse.html'));
});

router.get('/user/:id/updateWarehouse', authenticator, allowAdminOrSeller, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'update_warehouse.html'));
});

router.get('/admin/profile/:id/', authenticator, allowAdmin, async (req, res) => {
  req.body.id = Number(req.params.id);
  //req.body.customer = req.params.
  //const response = await userController.fetchUser(req.body)
  res.sendFile(path.join(__dirname, '../pages' , 'admin_users.html'));
});

router.get('/admin/:id/addCategory', authenticator, allowAdmin, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'add_category.html'));
});

router.get('/admin/:id/warehouses', authenticator, allowAdmin, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'warehouses.html'));
});

router.get('/admin/:id/orders', authenticator, allowAdmin, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'admin_orders.html'));
});

router.get('/admin/:id/shipments', authenticator, allowAdmin, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'admin_shipments.html'));
});

router.get('/customers', authenticator, allowAdmin,  async (req, res, next) => {
  const response = await userController.fetchAllCustomers();
  return res.status(response.status).send(response)
})

router.put('/activate/:id', authenticator, allowAdmin, async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await userController.activateUser(req.body);
  return res.status(response.status).send(response)
})

router.put('/deActivate/:id', authenticator, allowAdmin, async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await userController.deActivateUser(req.body);
  return res.status(response.status).send(response)
})


router.put('/verifySeller/:id', authenticator, allowAdmin, async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await userController.verifySeller(req.body);
  return res.status(response.status).send(response)
})

router.put('/activateSeller/:id', authenticator, allowAdmin, async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await userController.activateSeller(req.body);
  return res.status(response.status).send(response)
})

router.put('/deActivateSeller/:id', authenticator, allowAdmin, async (req, res) => {
  req.body.id = Number(req.params.id);
  const response = await userController.deActivateSeller(req.body);
  return res.status(response.status).send(response)
})

router.get('/customer/profile/:id/', authenticator, allowCustomer, async (req, res) => {
  req.body.id = Number(req.params.id);
  //req.body.customer = req.params.
  //const response = await userController.fetchUser(req.body)
  res.sendFile(path.join(__dirname, '../pages' , 'profile.html'));
});

router.get('/customer/profile/:id/update', authenticator, allowCustomer, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'complete_profile.html'));
});

router.get('/customer/:id/addToCart', authenticator, allowCustomer, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'kidney_beans.html'));
});

router.get('/customer/:id/products', authenticator, allowCustomer, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'user_products.html'));
});

router.get('/customer/:id/cart', authenticator, allowCustomer, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'user_cart.html'));
});

router.get('/customer/:id/shipments', authenticator, allowCustomer, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'shipments.html'));
});


router.get('/customer/:id/payments', authenticator, allowCustomer, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'user_payments.html'));
});

router.get('/customer/:id/transactions', authenticator, allowCustomer, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'user_transactions.html'));
});

router.get('/customer/:id/tracking', authenticator, allowCustomer, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'user_tracking.html'));
});

router.get('/customer/:id/orders', authenticator, allowCustomer, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'orders.html'));
});



router.get('/seller/:id/updateSeller', authenticator, allowSeller, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'update_seller_profile.html'));
});

router.get('/seller/profile/:id/', authenticator, allowSeller, async (req, res) => {
  req.body.id = Number(req.params.id);
  //const response = await userController.fetchSeller(req.body)
  res.sendFile(path.join(__dirname, '../pages' , 'seller_profile.html'));
});

router.get('/seller/:id/createProduct', authenticator, allowSeller, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'add_product.html'));
});

router.get('/seller/:id/products', authenticator, allowSeller, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'seller_products.html'));
});

router.get('/seller/:id/sales', authenticator, allowSeller, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'seller_sold.html'));
});

router.get('/seller/:id/dispatch', authenticator, allowSeller, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'dispatch_shipment.html'));
});

router.get('/seller/:id/warehouses', authenticator, allowSeller, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'seller_warehouses.html'));
});

router.get('/seller/:id/transactions', authenticator,  allowSeller, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'transactions.html'));
});

router.get('/seller/:id/updateProduct', authenticator, allowSeller, async (req, res) => {
  req.body.id = Number(req.params.id);
  res.sendFile(path.join(__dirname, '../pages' , 'update_product.html'));
});

/** router.get('/profile/:id/', authenticator, auth, async (req, res) => {
  req.body.id = Number(req.params.id);
  console.log(req.body.id );
  //const response = await userController.fetchUser(req.body)
  //console.log(req.session.user_roles.indexOf('customer'));
  if (req.session.user_roles.indexOf('admin') >= 0) {
        //res.status(response.status).send(response)
        res.sendFile(path.join(__dirname, '../pages' , 'add_category.html'));

  }
  else if (req.session.user_roles.indexOf('seller') >= 0) {
       //res.status(response.status).send(response)
       res.sendFile(path.join(__dirname, '../pages' , 'seller_profile.html'));
       //return res.status(response.status).send(response)
       //res.redirect('/profile/:id/seller/');
    }
  else if (req.session.user_roles.indexOf('customer') >= 0) {
      //res.status(response.status).send(response)
      res.sendFile(path.join(__dirname, '../pages' , 'profile.html'));
    }
  else {
      //res.status(401).send(response);
      return res.sendFile(path.join(__dirname, '../pages' , 'index.html'));
    }
   //return res.status(response.status).send(response);
}); **/

module.exports = router;
