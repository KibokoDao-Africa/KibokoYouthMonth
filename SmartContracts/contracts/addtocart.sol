pragma solidity ^0.4.23;
import "./SafeMath.sol";
import "./ExternalStorage.sol";
import "./orders.sol";
//import "./delivery.sol";
import "./ProductsLibrary.sol";
import "./users.sol";
import "./products.sol";

contract addtocart {
using ProductsLibrary for address;
using SafeMath for uint256;
//delivery public deliver;

ExternalStorage public  externalStore;

orders public order;

products public product;

users public user;

constructor(ExternalStorage _externalStore, users _user, orders _order, products _product) public{
        require(msg.sender != address(0));
        externalStore = _externalStore;
        user = _user;
        order = _order;
        product = _product;
    }

function addUpdateToCart(
    string _theProd,
    string _location,
    uint256 _quantity,
    uint _orderId,
    address _buying,
    uint256 _ethPrice
  ) public  returns(uint orderId, address _farmer, address _buyer , uint256 _amountPayable){
   require (user.isUser(msg.sender) && user.isUser(_buying));
   require(_quantity > 0 && _quantity <= product.getQuantity(_theProd));
   //uint256 price = ;

   _buyer = _buying;
   _amountPayable = product.getPrice(_theProd).mul(_quantity);
     _farmer = product.getFarmer(_theProd);
   product.addAmountRecievable(_farmer, _orderId, _amountPayable);
   //produceList[msg.sender].quantity = produceList[msg.sender].quantity.add(_quantity);
   product.addAmountPayable(_buying, _orderId, _amountPayable);

   product.addAmountRecievableEth(_farmer, _orderId, _amountPayable.div(_ethPrice));

   product.addAmountPayableEth(_buying, _orderId, _amountPayable.div(_ethPrice));

   //uint _orderIndex = noOfOrders;
   order.createAddToOrder(_orderId, _buying, _quantity, _amountPayable, _location);
   //deliver.shipmentInfo[noOfOrders].orderNumber = noOfOrders;
   //deliver.shipmentInfo[noOfOrders].destination = msg.sender;
   //deliver.shipmentInfo[noOfOrders].state = deliver.deliveryStatus.Preparing;
   ///emit newOrder(noOfOrders, msg.sender, _quantity, _quantity.mul(_price));
   product.setQuantity(_theProd, _quantity);

   ProductsLibrary.setProductQuantity(externalStore, keccak256(abi.encodePacked("Product_name", _theProd)), product.getQuantity(_theProd));
   //bool _success = true;
   orderId = _orderId;
   return (orderId, _farmer, _buying, _amountPayable);
  }
}
