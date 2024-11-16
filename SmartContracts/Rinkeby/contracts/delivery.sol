pragma solidity ^0.4.23;
//import "./SafeMath.sol";
//import "./products.sol";
import "./orders.sol";
import "./users.sol";
/**
 * @title Shipment Delivery Management Smart Contract
 *
 * @dev	Keeps track of each shipment delivery information, shipment GPS location, and Shipment Delivery
 * @author Kelvin Ndereba
 * GandH Blockchain Solutions
 */

 /**
  * @notice Delivery  Tracking Smart contract
  **/
 contract delivery {
 //using SafeMath for uint256;


 orders public order;

// products public product;

 users public user;

 enum deliveryStatus {Shipped, Delivered, Returned, Active, Preparing, Completed}

 struct deliveryDetails{
   uint deliverOrderNumber;
   address buyer;
   string deliveryLocation;
   uint256 deliveryPeriod;
   uint256 quantity;
   deliveryStatus status;
 }



 event toDeliver(uint deliverOrderNumber, address _buyer, string ShiptoLocation, uint256 _ShipQuantity);
 event deliverOrder (uint randomdeliverOrderNumber, address destination, string deliveredTo, uint256 consignmentSize);
event shipmentDeliver(uint _orderNum, address _buyer, string _buyerLocation, uint256 _timestamp);

 mapping(uint => deliveryDetails) deliveryInfo;
 mapping(uint => bytes32) GPSLocation;

 constructor(users _user, orders _order) public{
         require(msg.sender != address(0));
         //externalStore = _externalStore;
         user = _user;
         order = _order;
         //product = _product;
     }

 function addDeliveryInfo(
   address _buyer,
   string _deliveryLocation,
   uint256 _quantity,
   uint _orderNumber
 )public {
     require(user.isUser(_buyer) == true && user.isUser(msg.sender) == true);
     deliveryInfo[_orderNumber].deliverOrderNumber = _orderNumber;
     deliveryInfo[_orderNumber].buyer = _buyer;
     deliveryInfo[_orderNumber].deliveryLocation = _deliveryLocation;
     deliveryInfo[_orderNumber].quantity = _quantity;
     deliveryInfo[_orderNumber].status = deliveryStatus.Shipped;
     emit toDeliver(_orderNumber, _buyer, _deliveryLocation,_quantity);
   }

  function deliverByOrder(
    uint _deliveryOrderNumber,
    string _deliveryLocation,
    uint256 _deliveryPeriod,
    uint256 _quantity
  )public{
      require(user.isUser(msg.sender) == true);
     // bytes32 byteCommodity = keccak256(abi.encodePacked(_commodity));
     // bytes32 byteDeliver = keccak256(abi.encodePacked(_deliveryLocation));
      require(_deliveryPeriod >= deliveryInfo[_deliveryOrderNumber].deliveryPeriod);
      //require(product.checkProduct(_commodity) == true);
      //require(product.checkDestination(_deliveryLocation) == true);

      require(_quantity >= deliveryInfo[_deliveryOrderNumber].quantity);
      require(deliveryInfo[_deliveryOrderNumber].status == deliveryStatus.Shipped || deliveryInfo[_deliveryOrderNumber].status == deliveryStatus.Active);
      deliveryInfo[_deliveryOrderNumber].status = deliveryStatus.Delivered;
      address buyer = deliveryInfo[_deliveryOrderNumber].buyer;
      order.updateOrderStatus(_deliveryOrderNumber);
      emit deliverOrder(_deliveryOrderNumber, buyer, _deliveryLocation, _quantity);

    }

    function deliverShipment(
      uint _deliveryOrderNumber
    ) public  {
        require(user.isUser(msg.sender) == true);
        //require(order.getShipmentStatus(_deliveryOrderNumber) == Shipped || order.getShipmentStatus(_deliveryOrderNumber) == Preparing);
        order.setShipmentStatus(_deliveryOrderNumber);
        order.updateOrderStatus(_deliveryOrderNumber);
        emit shipmentDeliver(_deliveryOrderNumber, order.getShipmentDestination(_deliveryOrderNumber), order.getBuyerLocation(_deliveryOrderNumber), block.timestamp);

      }

    function setGPSlocation(string _location, uint _deliveryNum) public {
      require(user.isUser(msg.sender) == true);
      require(deliveryInfo[_deliveryNum].status == deliveryStatus.Shipped);
      bytes32 location = keccak256(abi.encodePacked(_location));
      GPSLocation[_deliveryNum] = location;
    }

    function getGPSlocation(uint _deliveryNum) public   view returns (bytes32) {
      require(user.isUser(msg.sender) == true);
      require(deliveryInfo[_deliveryNum].status == deliveryStatus.Shipped);
      bytes32 location = GPSLocation[_deliveryNum];
      return location;
    }

    function setShipmentGPSlocation(string _location, uint _orderNumber) public {
      require(user.isUser(msg.sender) == true);
      //require(order.getShipmentStatus(_orderNumber) == 'Shipped');
      bytes32 location = keccak256(abi.encodePacked(_location));
      GPSLocation[_orderNumber] = location;
    }

    function getShipmentGPSlocation(uint _orderNumber) public  view  returns (bytes32) {
      require(user.isUser(msg.sender) == true);
      //require(order.getShipmentStatus(_orderNumber) == 'Shipped');
      bytes32 location = GPSLocation[_orderNumber];
      return location;
    }

    /** function getDeliveryID() private view returns (uint256) {
        return uint256(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%259);
    } **/
 }
