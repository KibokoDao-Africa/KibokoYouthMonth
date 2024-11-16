pragma solidity ^0.4.23;
import "./SafeMath.sol";
import "./ExternalStorage.sol";
import "./orders.sol";
import "./delivery.sol";
import "./ProductsLibrary.sol";
import "./users.sol";
import "./products.sol";

contract buy {
using ProductsLibrary for address;
using SafeMath for uint256;
delivery public deliver;

ExternalStorage public  externalStore;

orders public order;

products public product;

users public user;

event purchases(uint _orderId, address _buyer, address _seller, uint256 _quantity, uint256 _subTotal);

constructor(ExternalStorage _externalStore, delivery _deliver, users _user, orders _order, products _product) public{
        require(msg.sender != address(0));
        externalStore = _externalStore;
        deliver = _deliver;
        user = _user;
        order = _order;
        product = _product;
    }

function buyProduct(
  string _theProd,
   string _location,
    uint256 _quantity,
    address _buying,
    uint _orderId,
    uint256 _ethPriceUSD
  ) public  payable /** returns(address, string, string, uint, uint256) **/{
require(msg.sender != address(0));
//require(userList[_farmer] == true);
require (user.isUser(msg.sender) && user.isUser(_buying));
require(_quantity > 0 && _quantity <= product.getQuantity(_theProd));

//require(isLocation[keccak256(abi.encodePacked(_location))] == true);
address _farmer = product.getFarmer(_theProd);


//productTitle[farmer].quantity = produceList[farmer].quantity.sub(_quantity);
uint256 _amountPayable = product.getPrice(_theProd).mul(_quantity);
//  _farmer = product.getFarmer(_theProd);

product.addAmountRecievable(_farmer, _orderId, _amountPayable);
//produceList[msg.sender].quantity = produceList[msg.sender].quantity.add(_quantity);
product.addAmountPayable(_buying, _orderId, _amountPayable);

product.addAmountRecievableEth(_farmer, _orderId, _amountPayable.div(_ethPriceUSD));

product.addAmountPayableEth(_buying, _orderId, _amountPayable.div(_ethPriceUSD));
//uint _orderIndex = noOfOrders;
order.createAddToOrder(_orderId,_buying, _quantity, _amountPayable, _location);


//bytes32 theProd = keccak256(abi.encodePacked("Product_name", _theProd));


product.setQuantity(_theProd, _quantity);


ProductsLibrary.setProductQuantity(externalStore, keccak256(abi.encodePacked("Product_name", _theProd)), product.getQuantity(_theProd));

deliver.addDeliveryInfo(_buying, _location, _quantity, _orderId);

//uint256 _price = ProductsLibrary.getProductPrice(externalStore, theProd);

emit purchases(_orderId, _buying , _farmer, _quantity, _amountPayable);
//emit newOrder(noOfOrders, msg.sender, _quantity, _quantity.mul(_price));
//incrementOrders();
//emit deliverProduct(_location, commodity, deliveredTo, consignmentSize)
//return(msg.sender, _location, _theProd, _orderIndex, _quantity);
}
}
