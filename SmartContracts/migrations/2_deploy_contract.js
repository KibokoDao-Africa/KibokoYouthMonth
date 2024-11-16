const  ProductsLibrary = artifacts.require("./ProductsLibrary.sol");
const SafeMath = artifacts.require("./SafeMath.sol");
const ExternalStorage = artifacts.require("./ExternalStorage.sol");
const products = artifacts.require("./products.sol");
const orders = artifacts.require("./orders.sol");




module.exports = function(deployer) {
  //deployer.deploy(ExternalStorage);//0xFE8dc8cCC0CbB71B55e5008e5401079DF72B429c
  //deployer.deploy(ProductsLibrary);//0x54049e53f00548013bc7a816616a8893d81bd2ae
  deployer.link(SafeMath, orders);
  deployer.deploy(orders);
  //deployer.link(SafeMath, delivery);
  //deployer.deploy(delivery);
  //deployer.link(ProductsLibrary, products);
  //deployer.link(SafeMath, products);
  //deployer.link(ProductsLibrary, products);
  //deployer.deploy(products, );
  //deployer.deploy(delivery);
}
