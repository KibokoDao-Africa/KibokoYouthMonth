pragma solidity ^0.4.23;
import "./SafeMath.sol";
import "./ExternalStorage.sol";
import "./ProductsLibrary.sol";
import "./users.sol";

/**
@dev Adding New Products, Updating Price, and setting picture Link
*/
contract products{
using ProductsLibrary for address;
using SafeMath for uint256;


ExternalStorage public  externalStore;


//= 0xFE8dc8cCC0CbB71B55e5008e5401079DF72B429c;
uint public noOfproducts;


//enum Grade {Grade1, Grade2, Grade3}

users public user;

//enum OrderStatus {Preparing, Shipped, Active, Returned, Completed}

struct productsList{
  string productName;
  string pictureLink;
  uint256 productPrice;
  uint256 quantity;
  address farmer;
  string grade;
}






event addedProducts(string _productName, address _farmer, uint256 _price, string _grade);
event newPrice(string _prodNm, address _theFam , uint256 _prevPrice, uint256 _newPrice);






mapping(address => productsList )public produceList;
mapping(bytes32 => productsList) public productTitle;
mapping (address => mapping (uint => uint256)) amountToPay;
mapping (address => mapping( uint => uint256)) amountToRecieve;
mapping (address => mapping (uint => uint256)) amountToPayEth;
mapping (address => mapping( uint => uint256)) amountToRecieveEth;


constructor(ExternalStorage _externalStore, users _user) public{
        require(msg.sender != address(0));
        externalStore = _externalStore;
        user = _user;
    }



function addNewProduct(
  string _name,
  string _location,
  uint256 _price,
  address _farmer,
  string _grade,
  uint256 _quantity
) public  returns (string, address, uint256, string) {
  require(user.isUser(_farmer));
  ProductsLibrary.addProduct(externalStore, keccak256(abi.encodePacked("Product_name", _name)), _location, _price,_farmer, _grade);
  produceList[_farmer].productName = _name;
  produceList[_farmer].productPrice = _price;
  produceList[_farmer].farmer = _farmer;
  produceList[_farmer].quantity = _quantity;
  produceList[_farmer].grade = _grade;
  bytes32 bytesName = keccak256(abi.encodePacked(_name));
  //bytes32 bytesLocation = keccak256(abi.encodePacked(_location));
  productTitle[bytesName].productName = _name;
  productTitle[bytesName].productPrice = _price;
  productTitle[bytesName].farmer = _farmer;
  productTitle[bytesName].quantity = _quantity;
  productTitle[bytesName].grade = _grade;
  //isLocation[bytesLocation] = true;
  noOfproducts = noOfproducts + 1;
  emit addedProducts(_name, _farmer, _price, _grade);
  return (_name, _farmer, _price, _grade);
}




function updateProductPrice(
  uint256 _newPrice,
  string productName
) public returns (string, address, uint256,uint256) {
require(_newPrice > 0);
require(user.isUser(msg.sender));
bytes32 _productName = keccak256(abi.encodePacked("Product_name", productName));
ProductsLibrary.setProductPrice(externalStore,_productName, _newPrice);
uint256 oldPrice = productTitle[_productName].productPrice;
address farmer = productTitle[_productName].farmer;
productTitle[_productName].productPrice = _newPrice;
produceList[productTitle[_productName].farmer].productPrice = _newPrice;
//produceList[productTitle[_productName].buyer] = _newPrice;
emit newPrice(productName, farmer, oldPrice, _newPrice);
return (productName,farmer, oldPrice, ProductsLibrary.getProductPrice(externalStore, _productName));
}

function setProductPictureLink(
  address _farmer,
  string _productName,
  string _pictureLink
)public returns (string productName, string pictureLink){
  require(user.isUser(_farmer) && user.isUser(msg.sender));
  bytes32 product = keccak256(abi.encodePacked(_productName));
  productTitle[product].pictureLink = _pictureLink;
  productName = _productName;
  pictureLink = _pictureLink;
  return (productName, pictureLink);
}




        /** function checkProduct(string _nameProduct) view external returns (bool){

          bytes32 nameProduct = keccak256(abi.encodePacked(_nameProduct));

        return isProduct[nameProduct];
        }

        function checkDestination(string _finalDestination) view external returns (bool){
        bytes32 finalDestination = keccak256(abi.encodePacked(_finalDestination));
        return isLocation[finalDestination];
        } **/
        function getQuantity(string _product) view external  returns (uint256){
        require(user.isUser(msg.sender));
        return productTitle[keccak256(abi.encodePacked(_product))].quantity;
        }
        function getFarmer(string _product) view external  returns (address){
        require(user.isUser(msg.sender));
        return productTitle[keccak256(abi.encodePacked(_product))].farmer;
        }
        function getPrice(string _product) view external  returns (uint256){
        require(user.isUser(msg.sender));
        return productTitle[keccak256(abi.encodePacked(_product))].productPrice;
        }
        function amountPayable(address _sender, uint _order) view external returns (uint256){
        require(user.isUser(msg.sender));
        return amountToPay[_sender][_order];
        }

        function amountRecievable(address _to, uint _order) view external returns (uint256){
        require(user.isUser(msg.sender));
        return amountToRecieve[_to][_order];
        }
        function amountPayableEth(address _sender, uint _order) view external returns (uint256){
        require(user.isUser(msg.sender));
        return amountToPayEth[_sender][_order];
        }

        function amountRecievableEth(address _to, uint _order) view external returns (uint256){
        require(user.isUser(msg.sender));
        return amountToRecieveEth[_to][_order];
        }

        function addAmountRecievable(address _to, uint _order, uint256 _amount) external {
         require(user.isUser(msg.sender));
         amountToRecieve[_to][_order] = amountToRecieve[_to][_order].add(_amount);
        }
        function setAmountRecievable(address _to, uint _order, uint256 _amount) external {
         require(user.isUser(msg.sender));
         amountToRecieve[_to][_order] = amountToRecieve[_to][_order].sub(_amount);
        }
        function setAmountPayable(address _sender, uint _order, uint256 _amount) external {
         require(user.isUser(msg.sender));
         amountToPay[_sender][_order] = amountToPay[_sender][_order].sub(_amount);
        }

        function addAmountPayable(address _sender, uint _order, uint256 _amount) external {
         require(user.isUser(msg.sender));
         amountToPay[_sender][_order] = amountToPay[_sender][_order].add(_amount);
        }

        function addAmountRecievableEth(address _to, uint _order, uint256 _amount) external {
         require(user.isUser(msg.sender));
         amountToRecieveEth[_to][_order] = amountToRecieveEth[_to][_order].add(_amount);
        }
        function setAmountRecievableEth(address _to, uint _order, uint256 _amount) external {
         require(user.isUser(msg.sender));
         amountToRecieveEth[_to][_order] = amountToRecieveEth[_to][_order].sub(_amount);
        }
        function setAmountPayableEth(address _sender, uint _order, uint256 _amount) external {
         require(user.isUser(msg.sender));
         amountToPayEth[_sender][_order] = amountToPayEth[_sender][_order].sub(_amount);
        }

        function addAmountPayableEth(address _sender, uint _order, uint256 _amount) external {
         require(user.isUser(msg.sender));
         amountToPayEth[_sender][_order] = amountToPayEth[_sender][_order].add(_amount);
        }

        function setQuantity(string _product, uint256 _amount) external {
         require(user.isUser(msg.sender));
         productTitle[keccak256(abi.encodePacked(_product))].quantity = productTitle[keccak256(abi.encodePacked(_product))].quantity.sub(_amount);
        }

}
