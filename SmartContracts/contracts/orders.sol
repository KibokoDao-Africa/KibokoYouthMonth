pragma solidity ^0.4.23;
import "./users.sol";
import "./SafeMath.sol";

contract orders{
//using ProductsLibrary for address;
//ExternalStorage public  externalStore;
using SafeMath for uint256;
uint public noOfOrders;
users public user;
 enum  OrderStatus {Preparing, Shipped, Active, Returned, Completed}
 enum  ShipmentStatus {Preparing, Shipped, Delivered}
struct Orders {
  uint OrderID;
  address placedBy;
  uint quantity;
  uint subTotal;
  OrderStatus orderStatus;
  uint256 orderedTime;
}

struct shipment{
  uint orderNumber;
  address destination;
  ShipmentStatus state;
  string buyerLocation;
}

event newOrder(uint _orderRef , address _buyerAddress, uint256 _orderQuantity, uint256 _orderSubTotal);


//mapping(address => Orders )public ordersSort;
mapping(uint => Orders )public ordersIndex;
mapping(uint => shipment) public shipmentInfo;

constructor(users _user) public{
        require(msg.sender != address(0));
        user = _user;
    }

  function createAddToOrder(
    uint _orderId,
    address _ordering,
    uint256 _quantity,
    uint256 _subTotal,
    string _buyerLocation
   ) public  returns (
      uint,
      address,
      uint256,
      uint256){
    require(_subTotal > 0);
    if (ordersIndex[_orderId].orderStatus == OrderStatus.Preparing){
      ordersIndex[_orderId].quantity = ordersIndex[_orderId].quantity.add(_quantity);
      ordersIndex[_orderId].subTotal = ordersIndex[_orderId].subTotal.add(_subTotal);
    }
    else{
      _orderId = noOfOrders;
      ordersIndex[_orderId].OrderID = _orderId;
      ordersIndex[_orderId].placedBy = msg.sender;
      ordersIndex[_orderId].quantity = _quantity;
      ordersIndex[_orderId].subTotal = _subTotal;//_quantity.mul(ProductsLibrary.getProductPrice(externalStore, keccak256(abi.encodePacked("Product_name", _prodName))));
      ordersIndex[_orderId].orderStatus = OrderStatus.Preparing;
      ordersIndex[_orderId].orderedTime = block.timestamp;
      emit newOrder(noOfOrders, msg.sender, _quantity, _subTotal);
      shipmentInfo[noOfOrders].orderNumber = noOfOrders;
      shipmentInfo[noOfOrders].destination = msg.sender;
      shipmentInfo[noOfOrders].state = ShipmentStatus.Preparing;
      shipmentInfo[noOfOrders].buyerLocation = _buyerLocation;
      incrementOrders();
    }
    return (_orderId, _ordering, _quantity, _subTotal);
  }

  function incrementOrders() internal {
    noOfOrders = noOfOrders + 1;
  }

    function updateOrderStatus(uint _orderNumber) public {
      ordersIndex[_orderNumber].orderStatus = OrderStatus.Completed;
     }
  function getShipmentStatus(uint _orderNumber) view external  returns (ShipmentStatus){
     require(user.isUser(msg.sender));
     return shipmentInfo[_orderNumber].state;
     }
     function getShipmentDestination(uint _orderNumber) view external  returns (address){
        require(user.isUser(msg.sender));
        return shipmentInfo[_orderNumber].destination;
        }

        function getBuyerLocation(uint _orderNumber) view external  returns (string){
           require(user.isUser(msg.sender));
           return shipmentInfo[_orderNumber].buyerLocation;
         }
         function getOrderAmount(uint _orderNumber) view external  returns (uint){
            require(user.isUser(msg.sender));
            return ordersIndex[_orderNumber].subTotal;
          }

     function setShipmentStatus(uint _orderNumber)  external {
        require(user.isUser(msg.sender));
        shipmentInfo[_orderNumber].state = ShipmentStatus.Delivered;
        }
}
