pragma solidity ^0.4.23;
import "./SafeMath.sol";
import "./ExternalStorage.sol";
import "./orders.sol";
import "./delivery.sol";
import "./ProductsLibrary.sol";
import "./users.sol";
import "./products.sol";

contract sell {
using ProductsLibrary for address;
using SafeMath for uint256;
delivery public deliver;

ExternalStorage public  externalStore;
users public user;

orders public order;

products public product;

event sales(uint _orderId, address _buyer, address _seller, uint256 _quantity, uint256 _subTotal);

constructor(delivery _deliver, ExternalStorage _externalStore, users _user, orders _order, products _product) public{
        require(msg.sender != address(0));
        deliver = _deliver;
        externalStore = _externalStore;
        user = _user;
        order = _order;
        product = _product;
    }

function sellProduct(
   string _prodName,
   address _buyer,
   uint256 _quantity,
   uint _orderId,
   string _destination,
   uint256 _ethPrice
 ) public  /** returns (address, string, string, uint, uint256) **/ {
   require(msg.sender != address(0));
   //require(userList[_farmer] == true);
   require (user.isUser(msg.sender) && user.isUser(_buyer));
   require(_quantity > 0 && _quantity <= product.getQuantity(_prodName));

   //require(isLocation[keccak256(abi.encodePacked(_destination))] == true);
   address _farmer = product.getFarmer(_prodName);


   //productTitle[farmer].quantity = produceList[farmer].quantity.sub(_quantity);
   uint256 _amountPayable = product.getPrice(_prodName).mul(_quantity);
   //  _farmer = product.getFarmer(_prodName);

   product.addAmountRecievable(_farmer, _orderId, _amountPayable);
   //produceList[msg.sender].quantity = produceList[msg.sender].quantity.add(_quantity);
   product.addAmountPayable(_buyer, _orderId, _amountPayable);

   product.addAmountRecievableEth(_farmer, _orderId, _amountPayable.div(_ethPrice));

   product.addAmountPayableEth(_buyer, _orderId, _amountPayable.div(_ethPrice));
   //uint _orderIndex = noOfOrders;
   order.createAddToOrder(_orderId,_buyer, _quantity, _amountPayable, _destination);


   //bytes32 theProd = keccak256(abi.encodePacked("Product_name", _prodName));


   product.setQuantity(_prodName, _quantity);


   ProductsLibrary.setProductQuantity(externalStore, keccak256(abi.encodePacked("Product_name", _prodName)), product.getQuantity(_prodName));

   deliver.addDeliveryInfo(_buyer, _destination, _quantity, _orderId);
emit sales(_orderId, _buyer , _farmer, _quantity, _amountPayable);
//emit newOrder(_orderIndex, _buyer, _quantity, _quantity.mul(ProductsLibrary.getProductPrice(externalStore, keccak256(abi.encodePacked("Product_name", _prodName)))));
//incrementOrders();
//return (msg.sender, _destination,  _prodName, noOfOrders, _quantity);
}
}
