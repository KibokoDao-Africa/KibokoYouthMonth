pragma solidity ^0.4.23;
/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {

  /**
  * @dev Multiplies two numbers, throws on overflow.
  */
  function mul(uint256 _a, uint256 _b) internal pure returns (uint256 c) {
    // Gas optimization: this is cheaper than asserting 'a' not being zero, but the
    // benefit is lost if 'b' is also tested.
    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
    if (_a == 0) {
      return 0;
    }

    c = _a * _b;
    assert(c / _a == _b);
    return c;
  }

  /**
  * @dev Integer division of two numbers, truncating the quotient.
  */
  function div(uint256 _a, uint256 _b) internal pure returns (uint256) {
    // assert(_b > 0); // Solidity automatically throws when dividing by 0
    // uint256 c = _a / _b;
    // assert(_a == _b * c + _a % _b); // There is no case in which this doesn't hold
    return _a / _b;
  }

  /**
  * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 _a, uint256 _b) internal pure returns (uint256) {
    assert(_b <= _a);
    return _a - _b;
  }

  /**
  * @dev Adds two numbers, throws on overflow.
  */
  function add(uint256 _a, uint256 _b) internal pure returns (uint256 c) {
    c = _a + _b;
    assert(c >= _a);
    return c;
  }
}


contract ExternalStorage{

    mapping(bytes32 => uint256) UInt256Storage;

    function getUInt256Value(bytes32 record) public constant returns (uint256){
        return UInt256Storage[record];
    }

    function setUInt256Value(bytes32 record, uint256 value) public
    {
        UInt256Storage[record] = value;
    }

    mapping(bytes32 => uint) UIntStorage;

    function getUIntValue(bytes32 record) public constant returns (uint){
        return UIntStorage[record];
    }

    function setUIntValue(bytes32 record, uint value) public
    {
        UIntStorage[record] = value;
    }

    mapping(bytes32 => string) StringStorage;

    function getStringValue(bytes32 record) public constant returns (string){
        return StringStorage[record];
    }

    function setStringValue(bytes32 record, string value) public
    {
        StringStorage[record] = value;
    }

    mapping(bytes32 => address) AddressStorage;

    function getAddressValue(bytes32 record) public constant returns (address){
        return AddressStorage[record];
    }

    function setAddressValue(bytes32 record, address value) public
    {
        AddressStorage[record] = value;
    }

    mapping(bytes32 => bytes) BytesStorage;

    function getBytesValue(bytes32 record) public constant returns (bytes){
        return BytesStorage[record];
    }

    function setBytesValue(bytes32 record, bytes value) public
    {
        BytesStorage[record] = value;
    }

    mapping(bytes32 => bool) BooleanStorage;

    function getBooleanValue(bytes32 record) public constant returns (bool){
        return BooleanStorage[record];
    }

    function setBooleanValue(bytes32 record, bool value) public
    {
        BooleanStorage[record] = value;
    }

    mapping(bytes32 => int) IntStorage;

    function getIntValue(bytes32 record) public constant returns (int){
        return IntStorage[record];
    }

    function setIntValue(bytes32 record, int value) public
    {
        IntStorage[record] = value;
    }

    mapping(address => uint) ProductIndex;

    function getIdValue(address record) public constant returns (uint){
        return ProductIndex[record];
    }

    function setIdValue(address record, uint value) public
    {
        ProductIndex[record] = value;
    }
}

// Products Library SmartContract

library ProductsLibrary {
 //    1. Product ID   2. Product Name   3. Product Description 4. product Location 5. Product Price
 //    6. Product Producer  7. Product Grade 8. Product Quality 9. Product Image ; product quantity
  function getProductCount(
    address _storageContract
    ) public constant returns(uint)
  {
    return ExternalStorage(_storageContract).getUIntValue(keccak256(abi.encodePacked("ProductCount")));
  }

  function addProduct(
    address _storeContract,
    bytes32 _name ,
    string _location,
    uint256 _price,
    address _producer,
    string _grade) public
  {
    uint productID = getProductCount(_storeContract);
    //var numvotes = 0;
    bytes32 name_hash = keccak256(abi.encodePacked("Product_name", productID));
    //bytes32 desc_hash = keccak256(abi.encodePacked("Product_desc", _name));
    bytes32 location_hash = keccak256(abi.encodePacked("Product_location", _name));
    bytes32 price_hash = keccak256(abi.encodePacked("Product_price", _name));
    bytes32 producer_hash = keccak256(abi.encodePacked("Product_producer", _name));
    bytes32 grade_hash = keccak256(abi.encodePacked("Product_grade", _name));
    //bytes32 quality_hash = keccak256(abi.encodePacked("Product_quality", _name));
    //bytes32 quantity_hash = keccak256(abi.encodePacked("Product_quantity", _name));
    //bytes32 image_hash = keccak256(abi.encodePacked("Product_image", _name));
    bytes memory cmpl_title_hash = bytes(abi.encodePacked(_name));
    //bytes memory byte_image_hash = bytes(abi.encodePacked(_image));

    ExternalStorage(_storeContract).setBytesValue(name_hash, cmpl_title_hash);
    //ExternalStorage(_storeContract).setStringValue(desc_hash, _desc);
    ExternalStorage(_storeContract).setStringValue(location_hash, _location);
    ExternalStorage(_storeContract).setUInt256Value(price_hash, _price);
    ExternalStorage(_storeContract).setAddressValue(producer_hash, _producer);
    ExternalStorage(_storeContract).setStringValue(grade_hash, _grade);
    //ExternalStorage(_storeContract).setStringValue(quality_hash, _quality);
    //ExternalStorage(_storeContract).setUIntValue(quantity_hash, _quantity);
    //ExternalStorage(_storeContract).setBytesValue(image_hash, byte_image_hash);

    ExternalStorage(_storeContract).setUIntValue(keccak256(abi.encodePacked(_name)), productID);
    ExternalStorage(_storeContract).setAddressValue(keccak256(abi.encodePacked(_name)), msg.sender);
    ExternalStorage(_storeContract).setUIntValue(keccak256(abi.encodePacked("ProductCount")), productID + 1);
  }
  function getProductPrice(
    address _storageContract,
    bytes32 _name
    ) public constant returns(uint256){

    return ExternalStorage(_storageContract).getUInt256Value(keccak256(abi.encodePacked("Product_price", _name)));
  }

  function getProductDescription(
    address _storageContract,
    bytes32 _name
    ) public constant returns(string){

    return ExternalStorage(_storageContract).getStringValue(keccak256(abi.encodePacked("Product_desc", _name)));
  }

  function getProductLocation(
    address _storageContract,
    bytes32 _name
    ) public constant returns(string){

    return ExternalStorage(_storageContract).getStringValue(keccak256(abi.encodePacked("Product_location", _name)));
  }
  function getProductProducer(
    address _storageContract,
    bytes32 _name
    ) public constant returns(address){

    return ExternalStorage(_storageContract).getAddressValue(keccak256(abi.encodePacked("Product_producer", _name)));
  }
  function getProductGrade(
    address _storageContract,
     bytes32 _name
     ) public constant returns(string){

    return ExternalStorage(_storageContract).getStringValue(keccak256(abi.encodePacked("Product_grade", _name)));
  }

  function getProductQuantity(
    address _storageContract,
    bytes32 _name
    )public constant returns(uint){
      // bytes32 name_hash = keccak256(abi.encodePacked("Product_name", idx));
      return ExternalStorage(_storageContract).getUIntValue(keccak256(abi.encodePacked("Product_quantity", _name)));

  }
   function getProductIndex(
     address _storageContract,
      bytes32 _name
      )public constant returns(uint){
       // bytes32 name_hash = keccak256(abi.encodePacked("Product_name", idx));
       return ExternalStorage(_storageContract).getUIntValue(keccak256(abi.encodePacked(_name)));

   }
   function getProductbyIndex(
     address _storageContract,
     uint _index
     )public constant returns(bytes){
       return ExternalStorage(_storageContract).getBytesValue(keccak256(abi.encodePacked("Product_name", _index)));

   }

   function setProductPrice(
     address _storageContract,
      bytes32 _name,
       uint256 _price
       ) public returns(uint256) {
       ExternalStorage(_storageContract).setUInt256Value(keccak256(abi.encodePacked("Product_price", _name)), _price);
       return getProductPrice( _storageContract, _name );
   }
   function setProductQuantity(
     address _storageContract,
     bytes32 _name,
      uint _quantity
      ) public  returns(uint) {
       ExternalStorage(_storageContract).setUIntValue(keccak256(abi.encodePacked("Product_quantity", _name)), _quantity);
       return getProductPrice( _storageContract, _name );
   }
  function setOwnerAddress(
    address _storageContract,
     bytes32 _name
     ) public returns (address){
      ExternalStorage(_storageContract).setAddressValue(keccak256(abi.encodePacked(_name)), msg.sender);
      return  ExternalStorage(_storageContract).getAddressValue(keccak256(abi.encodePacked(_name)));
  }

}


contract orders{
//using ProductsLibrary for address;
//ExternalStorage public  externalStore;
using SafeMath for uint256;
uint public noOfOrders;

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
event shipmentDeliver(uint _orderNum, address _buyer, string _buyerLocation, uint256 _timestamp);

//mapping(address => Orders )public ordersSort;
mapping(uint => Orders )public ordersIndex;
mapping(uint => shipment) public shipmentInfo;


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

    function updateOrderStatus(uint _orderNumber, OrderStatus _orderStatus) public {
      ordersIndex[_orderNumber].orderStatus = _orderStatus;
     }

}

// Delivery  Tracking Smart contract

contract delivery is orders {
//using SafeMath for uint256;

products product;
//orders order;
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


mapping(uint => deliveryDetails) deliveryInfo;
mapping(uint => bytes32) GPSLocation;


function addDeliveryInfo(
  address _buyer,
  string _deliveryLocation,
  uint256 _quantity,
  address _product,
  uint _orderNumber
  )public {
    product = products(_product);
    require(product.isUser(_buyer) == true && product.isUser(msg.sender) == true);
    //require(product.isUser(_buyer) == true);
    //bytes32 byteCommodity = keccak256(abi.encodePacked(_commodity));
    //bytes32 byteDeliver = keccak256(abi.encodePacked(_deliveryLocation));
    //equire(_deliveryPeriod > block.timestamp);
    //require(product.checkProduct(_commodity) == true);
    //require(product.checkDestination(_deliveryLocation) == true);
    deliveryInfo[_orderNumber].deliverOrderNumber = _orderNumber;
    deliveryInfo[_orderNumber].buyer = _buyer;
    deliveryInfo[_orderNumber].deliveryLocation = _deliveryLocation;
    deliveryInfo[_orderNumber].quantity = _quantity;
    deliveryInfo[_orderNumber].status = deliveryStatus.Shipped;
    emit toDeliver(_orderNumber, _buyer, _deliveryLocation,_quantity);
  }

 function deliverByOrder(
   uint _deliveryOrderNumber,
   address _product,
   string _deliveryLocation,
   uint256 _deliveryPeriod,
   uint256 _quantity
   )public  {
     product = products(_product);
     //order = orders(_order);
     require(product.isUser(msg.sender) == true);
    // bytes32 byteCommodity = keccak256(abi.encodePacked(_commodity));
    // bytes32 byteDeliver = keccak256(abi.encodePacked(_deliveryLocation));
     require(_deliveryPeriod >= deliveryInfo[_deliveryOrderNumber].deliveryPeriod);
     //require(product.checkProduct(_commodity) == true);
     //require(product.checkDestination(_deliveryLocation) == true);

     require(_quantity >= deliveryInfo[_deliveryOrderNumber].quantity);
     require(deliveryInfo[_deliveryOrderNumber].status == deliveryStatus.Shipped || deliveryInfo[_deliveryOrderNumber].status == deliveryStatus.Active);
     deliveryInfo[_deliveryOrderNumber].status = deliveryStatus.Delivered;
     address buyer = deliveryInfo[_deliveryOrderNumber].buyer;
     product.updateOrderStatus(_deliveryOrderNumber, OrderStatus.Completed);
     emit deliverOrder(_deliveryOrderNumber, buyer,  _deliveryLocation, _quantity);

   }

   function deliverShipment(
     uint _deliveryOrderNumber,
     address _product

   ) public  {
       product = products(_product);
       require(product.isUser(msg.sender) == true);
       require(shipmentInfo[_deliveryOrderNumber].state == ShipmentStatus.Shipped || shipmentInfo[_deliveryOrderNumber].state == ShipmentStatus.Preparing);
       shipmentInfo[_deliveryOrderNumber].state = ShipmentStatus.Delivered;
       product.updateOrderStatus(_deliveryOrderNumber, OrderStatus.Completed);
       emit shipmentDeliver(_deliveryOrderNumber, shipmentInfo[_deliveryOrderNumber].destination, shipmentInfo[_deliveryOrderNumber].buyerLocation, block.timestamp);

     }

   function setGPSlocation(string _location, uint _deliveryNum, address _product) public {
     product = products(_product);
     require(product.isUser(msg.sender) == true);
     require(deliveryInfo[_deliveryNum].status == deliveryStatus.Shipped);
     bytes32 location = keccak256(abi.encodePacked(_location));
     GPSLocation[_deliveryNum] = location;
   }

   function getGPSlocation(uint _deliveryNum, address _product) public  returns (bytes32) {
     product = products(_product);
     require(product.isUser(msg.sender) == true);
     require(deliveryInfo[_deliveryNum].status == deliveryStatus.Shipped);
     bytes32 location = GPSLocation[_deliveryNum];
     return location;
   }

   function setShipmentGPSlocation(string _location, uint _orderNumber, address _product) public {
     product = products(_product);
     require(product.isUser(msg.sender) == true);
     require(shipmentInfo[_orderNumber].state == ShipmentStatus.Shipped);
     bytes32 location = keccak256(abi.encodePacked(_location));
     GPSLocation[_orderNumber] = location;
   }

   function getShipmentGPSlocation(uint _orderNumber, address _product) public   returns (bytes32) {
     product = products(_product);
     //order = orders(_order);
     require(product.isUser(msg.sender) == true);
     require(shipmentInfo[_orderNumber].state == ShipmentStatus.Shipped);
     bytes32 location = GPSLocation[_orderNumber];
     return location;
   }

   /** function getDeliveryID() private view returns (uint256) {
       return uint256(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%259);
   } **/
}


// Adding New Products, Purchase, Sale, and Pricing SmartContract



/**
@dev Adding New Products, Purchase, Sale, and Pricing SmartContract
*/
contract products is orders{
using ProductsLibrary for address;
using SafeMath for uint256;
delivery public deliver;

ExternalStorage public  externalStore;


//= 0xFE8dc8cCC0CbB71B55e5008e5401079DF72B429c;
uint public noOfproducts;
uint public noOfusers;
address public admin;

//enum Grade {Grade1, Grade2, Grade3}

enum Roles {Admin, Farmer, Buyer}

//enum OrderStatus {Preparing, Shipped, Active, Returned, Completed}

struct productsList{
  string productName;
  string pictureLink;
  uint256 productPrice;
  uint256 quantity;
  address farmer;
  string grade;
}




event purchases(uint _orderId, address _buyer, address _seller, uint256 _quantity, uint256 _subTotal, OrderStatus _deliverState);
event sales(uint _orderId, address _buyer, address _seller, uint256 _quantity, uint256 _subTotal, OrderStatus _deliverState);
event addedProducts(string _productName, address _farmer, uint256 _price, string _grade);
event newPrice(string _prodNm, address _theFam , uint256 _prevPrice, uint256 _newPrice);
event newUser(string _userName, Roles _userCategory, address _userAddress);





mapping(address => productsList )public produceList;
mapping(bytes32 => productsList) public productTitle;
mapping (address => bool) public users;
//mapping(bytes32 => bool) isProduct;
//mapping(bytes32 => bool) isLocation;
//mapping(bytes32 => address) userName;
mapping(address => string) userLink;
mapping(address => Roles) userCategory;
mapping (address => mapping (uint => uint256)) amountToPay;
mapping (address => mapping( uint => uint256)) amountToRecieve;
mapping (address => mapping (uint => uint256)) amountToPayEth;
mapping (address => mapping( uint => uint256)) amountToRecieveEth;


constructor(delivery _deliver, ExternalStorage _externalStore) public{
        require(msg.sender != address(0));
        admin = msg.sender;
        deliver = _deliver;
        externalStore = _externalStore;
    }

modifier onlyUser(address _userAddress) {
    require(users[_userAddress] == true);
      _;
  }
modifier onlyAdmin() {
   require(msg.sender == admin);
   _;
}

function addNewProduct(
  string _name,
  string _location,
  uint256 _price,
  address _farmer,
  string _grade,
  uint256 _quantity
) public onlyUser(_farmer) returns (string, address, uint256, string) {

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

function sellProduct(
   string _prodName,
   address _buyer,
   uint256 _quantity,
   string _destination,
   uint256 _ethPrice
 ) public onlyUser(msg.sender)  /** returns (address, string, string, uint, uint256) **/ {
require(msg.sender != address(0) && _buyer != address(0) && users[_buyer] == true);
//bytes32 productDestination = keccak256(abi.encodePacked(_destination));
amountToRecieve[msg.sender][noOfOrders] = amountToRecieve[msg.sender][noOfOrders].add(productTitle[keccak256(abi.encodePacked("Product_name", _prodName))].productPrice.mul(_quantity));
//produceList[_buyer].quantity = produceList[_buyer].quantity.add(_quantity);
amountToPay[_buyer][noOfOrders] = amountToPay[_buyer][noOfOrders].add(productTitle[keccak256(abi.encodePacked("Product_name", _prodName))].productPrice.mul(_quantity));

amountToRecieveEth[msg.sender][noOfOrders] = amountToRecieve[msg.sender][noOfOrders].div(_ethPrice);

amountToPayEth[_buyer][noOfOrders] = amountToPay[msg.sender][noOfOrders].div(_ethPrice);

createAddToOrder(noOfOrders,_buyer, _quantity, _quantity.mul(productTitle[keccak256(abi.encodePacked(_prodName))].productPrice), _destination);

uint256 _newQuantity = ProductsLibrary.getProductQuantity(externalStore, keccak256(abi.encodePacked("Product_name", _prodName)));
_newQuantity = _newQuantity.sub(_quantity);

productTitle[keccak256(abi.encodePacked(_prodName))].quantity = productTitle[keccak256(abi.encodePacked(_prodName))].quantity.sub(_quantity);

ProductsLibrary.setProductQuantity(externalStore, keccak256(abi.encodePacked("Product_name", _prodName)), _newQuantity);
deliver.addDeliveryInfo(_buyer, _destination, _quantity, address(this), noOfOrders);
emit sales(noOfOrders,_buyer,msg.sender,_quantity, _quantity.mul(productTitle[keccak256(abi.encodePacked(_prodName))].productPrice), OrderStatus.Preparing);
//emit newOrder(_orderIndex, _buyer, _quantity, _quantity.mul(ProductsLibrary.getProductPrice(externalStore, keccak256(abi.encodePacked("Product_name", _prodName)))));
//incrementOrders();
//return (msg.sender, _destination,  _prodName, noOfOrders, _quantity);
}


function updateProductPrice(
  uint256 _newPrice,
  string productName
) public onlyUser(msg.sender) returns (string, address, uint256,uint256) {
require(_newPrice > 0);
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

function buyProduct(
  string _theProd,
   string _location,
    uint256 _quantity,
    address _farmer,
    uint256 _ethPriceUSD
  ) public onlyUser(msg.sender) payable /** returns(address, string, string, uint, uint256) **/{
require(msg.sender != address(0));
require(users[_farmer] == true);

//require(isLocation[keccak256(abi.encodePacked(_location))] == true);


require(_farmer != address(0));
bytes32 productName = keccak256(abi.encodePacked(_theProd));
//require(isProduct[keccak256(abi.encodePacked(_theProd))] == true);
//require(productTitle[productName].productName > 0);
//require(productTitle[keccak256(abi.encodePacked(_theProd))].productPrice > 0);
require(_quantity > 0 && _quantity <= productTitle[productName].quantity);

productTitle[productName].quantity = productTitle[productName].quantity.sub(_quantity);

//productTitle[farmer].quantity = produceList[farmer].quantity.sub(_quantity);
uint256 price = productTitle[productName].productPrice;
uint256 _amountPayable = price.mul(_quantity);

amountToRecieve[_farmer][noOfOrders] = amountToRecieve[_farmer][noOfOrders].add(_amountPayable);
//produceList[msg.sender].quantity = produceList[msg.sender].quantity.add(_quantity);
amountToPay[msg.sender][noOfOrders] = amountToPay[_farmer][noOfOrders].add(_amountPayable);

amountToRecieveEth[_farmer][noOfOrders] = amountToRecieve[_farmer][noOfOrders].div(_ethPriceUSD);

amountToPayEth[msg.sender][noOfOrders] = amountToPay[_farmer][noOfOrders].div(_ethPriceUSD);
//uint _orderIndex = noOfOrders;
createAddToOrder(noOfOrders,msg.sender, _quantity, _quantity.mul(price), _location);


//bytes32 theProd = keccak256(abi.encodePacked("Product_name", _theProd));


uint256 _newQuantity = ProductsLibrary.getProductQuantity(externalStore, keccak256(abi.encodePacked("Product_name", _theProd)));
_newQuantity = _newQuantity.sub(_quantity);

productTitle[productName].quantity = productTitle[productName].quantity.sub(_quantity);

ProductsLibrary.setProductQuantity(externalStore, keccak256(abi.encodePacked("Product_name", _theProd)), _newQuantity);

deliver.addDeliveryInfo(msg.sender, _location, _quantity, address(this), noOfOrders);

//uint256 _price = ProductsLibrary.getProductPrice(externalStore, theProd);

emit purchases(noOfOrders, msg.sender , _farmer, _quantity, _quantity.mul(productTitle[productName].productPrice), OrderStatus.Preparing);
//emit newOrder(noOfOrders, msg.sender, _quantity, _quantity.mul(_price));
//incrementOrders();
//emit deliverProduct(_location, commodity, deliveredTo, consignmentSize)
//return(msg.sender, _location, _theProd, _orderIndex, _quantity);
}

function addUpdateToCart(
    string _theProd,
    string _location,
    uint256 _quantity,
    uint _orderId,
    uint256 _ethPrice
  ) public onlyUser(msg.sender) returns(uint orderId, address _farmer, address _buyer , uint256 _amountPayable){
   require(_quantity > 0 && _quantity <= productTitle[keccak256(abi.encodePacked(_theProd))].quantity);
   //uint256 price = ;

   _amountPayable = productTitle[keccak256(abi.encodePacked(_theProd))].productPrice.mul(_quantity);
     _farmer = productTitle[keccak256(abi.encodePacked(_theProd))].farmer;
   amountToRecieve[_farmer][_orderId] = amountToRecieve[_farmer][_orderId].add(_amountPayable);
   //produceList[msg.sender].quantity = produceList[msg.sender].quantity.add(_quantity);
   amountToPay[msg.sender][_orderId] = amountToPay[_farmer][_orderId].add(_amountPayable);

   amountToRecieveEth[_farmer][_orderId] = amountToRecieve[_farmer][_orderId].div(_ethPrice);

   amountToPayEth[msg.sender][_orderId] = amountToPay[_farmer][_orderId].div(_ethPrice);
   //uint _orderIndex = noOfOrders;
   createAddToOrder(_orderId, msg.sender, _quantity, _amountPayable, _location);
   //deliver.shipmentInfo[noOfOrders].orderNumber = noOfOrders;
   //deliver.shipmentInfo[noOfOrders].destination = msg.sender;
   //deliver.shipmentInfo[noOfOrders].state = deliver.deliveryStatus.Preparing;
   ///emit newOrder(noOfOrders, msg.sender, _quantity, _quantity.mul(_price));
   productTitle[keccak256(abi.encodePacked(_theProd))].quantity = productTitle[keccak256(abi.encodePacked(_theProd))].quantity.sub(_quantity);

   ProductsLibrary.setProductQuantity(externalStore, keccak256(abi.encodePacked("Product_name", _theProd)), productTitle[keccak256(abi.encodePacked(_theProd))].quantity);
   //bool _success = true;
   orderId = _orderId;
   return (orderId, _farmer, msg.sender, _amountPayable);
  }




function setProductPictureLink(
  address _farmer,
  string _productName,
  string _pictureLink
)public onlyUser(_farmer) returns (string productName, string pictureLink){
  bytes32 product = keccak256(abi.encodePacked(_productName));
  productTitle[product].pictureLink = _pictureLink;
  productName = _productName;
  pictureLink = _pictureLink;
  return (productName, pictureLink);
}


function addUser(
  string _name,
   Roles _category,
   address _user
 ) public onlyAdmin returns( string, Roles, address){
     require(_user != address(0));
      require(users[_user] == false);
      users[_user] = true;

     // userName[keccak256(abi.encodePacked(_name))] = _user;
      userLink[_user] = _name;
      userCategory[_user] = _category;
      noOfusers = noOfusers + 1;

      emit newUser(_name, _category, _user);
      return (_name, _category, _user);
    }

    function blacklistUser(
       address _user
       ) public onlyAdmin {
          require(users[_user] == true);
          users[_user] = false;
          noOfusers = noOfusers - 1;
        }

        function isUser(address _user) view external returns (bool){
        return users[_user];
        }

        /** function checkProduct(string _nameProduct) view external onlyUser(msg.sender) returns (bool){

          bytes32 nameProduct = keccak256(abi.encodePacked(_nameProduct));

        return isProduct[nameProduct];
        }

        function checkDestination(string _finalDestination) view external onlyUser(msg.sender) returns (bool){
        bytes32 finalDestination = keccak256(abi.encodePacked(_finalDestination));
        return isLocation[finalDestination];
        } **/

        function amountPayable(address _sender, uint _order) view external onlyUser(msg.sender) returns (uint256){
        return amountToPay[_sender][_order];
        }

        function amountRecievable(address _to, uint _order) view external onlyUser(msg.sender) returns (uint256){
        return amountToRecieve[_to][_order];
        }
        function setAmountRecievable(address _to, uint _order, uint256 _amount) external onlyUser(msg.sender) {
         amountToRecieve[_to][_order] = amountToRecieve[_to][_order].sub(_amount);
        }
        function setAmountPayable(address _sender, uint _order, uint256 _amount) external onlyUser(msg.sender){
         amountToPay[_sender][_order] = amountToPay[_sender][_order].sub(_amount);
        }


}







// Add and Get Product Description , standard and Features Smart Contract
contract description is products {
 using SafeMath for uint256;
 products product;
 enum ProductType {Cereal, Coffee, Tea, Grain, Flour, Cocoa}
 enum ProductGrade {Grade1, Grade2, Grade3}
struct descriptions{
  ProductType category;
  string name;
  ProductGrade grade;
  string species;
  uint256 moisture;
  uint256 caffeineContent;
  uint256 aflatoxin;
}

event productDescription(address _farmer, string _itsName, ProductType _itsType, ProductGrade _itsGrade, string _itsSpecies, uint256 _itsMoisture, uint256 _itsCaffeineContent, uint256 _AflatoxinContent);

mapping(address => mapping(bytes32 => descriptions)) public addDescriptions;

constructor(products _product) public{
        require(msg.sender != address(0));
        product = _product;
    }

function addProductDescription(
  ProductType _type,
  string _name,
  ProductGrade _grade,
  string _species,
  uint256 _moisture,
  uint256 _caffeineContent,
  uint256 _aflatoxin
) public onlyUser(msg.sender) returns(address, string, ProductType, ProductGrade,  string, uint256, uint256, uint256){
    //require(product.isUser(msg.sender) == true);

    bytes32 byteName = keccak256(abi.encodePacked(_name));
   // require(product.checkProduct(_name) == true);
    addDescriptions[msg.sender][byteName].name = _name;
    addDescriptions[msg.sender][byteName].category = _type;
    addDescriptions[msg.sender][byteName].grade = _grade;
    addDescriptions[msg.sender][byteName].species = _species;
    addDescriptions[msg.sender][byteName].moisture = _moisture.mul(100);
    addDescriptions[msg.sender][byteName].caffeineContent = _caffeineContent.mul(100);
    addDescriptions[msg.sender][byteName].aflatoxin = _aflatoxin.mul(100);

    emit productDescription(msg.sender, _name, _type, _grade, _species, _moisture, _caffeineContent, _aflatoxin);
    return(msg.sender, _name, _type, _grade, _species, _moisture, _caffeineContent, _aflatoxin);
  }

  function getProductDescription(
    address _producer,
    string _productName
  )public view onlyUser(msg.sender) returns (
      ProductType,
      string,
      ProductGrade,
      string,
      uint256,
      uint256,
      uint256
      ){
      bytes32 productName = keccak256(abi.encodePacked(_productName));
      return(
        addDescriptions[_producer][productName].category,
        addDescriptions[_producer][productName].name,
        addDescriptions[_producer][productName].grade,
        addDescriptions[_producer][productName].species,
        addDescriptions[_producer][productName].moisture.div(100),
        addDescriptions[_producer][productName].caffeineContent.div(100),
        addDescriptions[_producer][productName].aflatoxin.div(100)
        );
      }
}


// Creating Product and Manipulating Sale Offers Based on Farmers Location Smart Contract
contract offers is products{
//using SafeMath for uint256;

products product;


uint public noOfOffers;

struct offer{
  string offerName;
  string productName;
  string productPicture;
  string productLocation;
  address productSource;
  uint256  quantity;
  string productLink;
}

event newOffer(string _productName , address _source, string _productLink, string _productLocation);

mapping(address  => mapping (bytes32 => offer)) public lookUpOffer;
mapping(bytes32  => mapping (bytes32 => offer)) public SearchByName;
mapping(bytes32 => bool) public isOffer;


constructor(products _product) public{
        require(msg.sender != address(0));
        product = _product;
    }

function setOffer(
  string _offerName,
  string _productName,
  string _productPicture,
  string _productLocation,
   address _productSource,
   string _productLink,
   uint256  _offerQuantity
   ) public onlyUser(msg.sender) {
  require(product.isUser(_productSource) == true);
  //require(product.checkProduct(_productName) == true);
 // require(product.checkDestination(_productLocation) == true);
  bytes32 offerName = keccak256(abi.encodePacked(_offerName));
  require(isOffer[offerName] == false);
  bytes32 byteOfferLoc = keccak256(abi.encodePacked(_productLocation));

  lookUpOffer[_productSource][byteOfferLoc].offerName = _offerName;
  lookUpOffer[_productSource][byteOfferLoc].productName = _productName;
  lookUpOffer[_productSource][byteOfferLoc].productPicture = _productPicture;
  lookUpOffer[_productSource][byteOfferLoc].productLocation = _productLocation;
  lookUpOffer[_productSource][byteOfferLoc].productSource = _productSource;
  lookUpOffer[_productSource][byteOfferLoc].productLink = _productLink;
  lookUpOffer[_productSource][byteOfferLoc].quantity = _offerQuantity;

  SearchByName[offerName][byteOfferLoc].productName = _offerName;
  SearchByName[offerName][byteOfferLoc].productName = _productName;
  SearchByName[offerName][byteOfferLoc].productPicture = _productPicture;
  SearchByName[offerName][byteOfferLoc].productLocation = _productLocation;
  SearchByName[offerName][byteOfferLoc].productSource = _productSource;
  SearchByName[offerName][byteOfferLoc].productLink = _productLink;
  SearchByName[offerName][byteOfferLoc].quantity = _offerQuantity;


  incrementOffers();
   isOffer[offerName] = true;
  emit newOffer(_productName, _productSource, _productLink, _productLocation);
}

function getOfferByLocation(
  address _bidder,
  string _location
  )public view onlyUser(msg.sender) returns (string, string, address, string, uint256){
    require(product.isUser(_bidder) == true);
    //require(product.checkDestination(_location) == true);
    bytes32 byteOfferLoc = keccak256(abi.encodePacked(_location));
    string storage  name = lookUpOffer[_bidder][byteOfferLoc].productName;
    //string storage picture = lookUpOffer[_bidder][_location].productPicture;
    string storage offerLocation = lookUpOffer[_bidder][byteOfferLoc].productLocation;
    address owner = lookUpOffer[_bidder][byteOfferLoc].productSource;
    string storage productInformation = lookUpOffer[_bidder][byteOfferLoc].productLink;
    uint256 offerQuantity = lookUpOffer[_bidder][byteOfferLoc].quantity;
    return(
      name,
      offerLocation,
      owner,
      productInformation,
      offerQuantity
      );
  }

  function incrementOffers() internal {
    noOfOffers = noOfOffers + 1;
  }

  }


/// payment escrow SmartContract
contract payments is products {
using SafeMath for uint256;

products product;

address public escrowAccount;

orders order;
enum Status {Paid, Escrowed, Released, Refunded, Pending, Declined}

enum PaymentMode {Ether, Bitcoin, AGA}

struct payment{
  uint orderTransactionNumber;
  address fromAccount;
  address toAccount;
  uint256 quantity;
  uint256 amount;
  PaymentMode mode;
  Status paymentStatus;
}


event paid(uint orderTransactionID, address from , address to, PaymentMode _paymentMode, uint256 productMass, uint256 total);
event released(address buying , address selling, uint orderTransactionRefRelease, uint256 releasedValue, uint releaseDate);
event refund(address buyer , address seller, uint orderTransactionRefRefund, uint256 refundedValue, uint refundDate);

mapping(uint => payment) paymentInfo;
mapping (address => mapping (address => uint256)) amountEscrowed;
//mapping (address => mapping (address => uint256)) amountEscrowed;

constructor(products _product, address _escrowAccount, orders _order) public{
        require(msg.sender != address(0));
        product = _product;
        order = _order;
        escrowAccount = _escrowAccount;
    }



function pay(
  address _fromAccount,
  address _toAccount,
  uint256 _quantity,
  uint256 _amount,
  PaymentMode _payMode,
  uint _orderNumber
)public onlyUser(msg.sender) payable{
     require(product.isUser(_toAccount) == true);
     require(product.isUser(_fromAccount) == true);
     require(product.amountPayable(_fromAccount ,_orderNumber) > 0);
     require(product.amountRecievable(_toAccount, _orderNumber) > 0);
     if (_payMode == PaymentMode.Ether){
     _amount = msg.value.div(10**18);
     }
     require(_amount >= ordersIndex[_orderNumber].subTotal);
     if (_payMode == PaymentMode.Ether && _amount > amountToPayEth[msg.sender][_orderNumber].mul(10**18)){
       _amount = amountToPayEth[msg.sender][_orderNumber].mul(10**18);
       msg.sender.transfer(msg.value.sub(_amount));
       escrowAccount.transfer(_amount);
       amountToPayEth[msg.sender][_orderNumber] = amountToPayEth[msg.sender][_orderNumber].sub(_amount);
       amountToRecieveEth[_toAccount][_orderNumber] = amountToPayEth[_toAccount][_orderNumber].sub(_amount);
     }
     paymentInfo[_orderNumber].orderTransactionNumber = _orderNumber;
     paymentInfo[_orderNumber].fromAccount = _fromAccount;
     paymentInfo[_orderNumber].toAccount = _toAccount;
     paymentInfo[_orderNumber].quantity = _quantity;
     paymentInfo[_orderNumber].amount = _amount;
     paymentInfo[_orderNumber].mode = _payMode;
     paymentInfo[_orderNumber].paymentStatus = Status.Escrowed;
     product.setAmountPayable(_fromAccount, _orderNumber, _amount);
     product.setAmountRecievable(_toAccount, _orderNumber, _amount);

     //order.shipmentInfo[_orderNumber].state = order.deliveryStatus.Shipped;
     amountEscrowed[_fromAccount][_toAccount] = amountEscrowed[_fromAccount][_toAccount].add(_amount);
     emit paid(_orderNumber, _fromAccount, _toAccount, _payMode, _quantity, _amount);
   }

   /** function generateTranscationID() private view returns (uint256) {
       return uint256(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%271);
   } **/

   function releasePayment(address _seller, address _buyer, uint _refNo) public onlyAdmin {
     require(product.isUser(_seller) == true);
     require(product.isUser(_buyer) == true);
     require(amountEscrowed[_buyer][_seller] > 0);
     require(paymentInfo[_refNo].paymentStatus == Status.Escrowed);


     uint256 _payment = amountEscrowed[_buyer][_seller];
     if (paymentInfo[_refNo].mode == PaymentMode.Ether){
       _seller.transfer(_payment.mul(10**18));
     }

     paymentInfo[_refNo].paymentStatus = Status.Released;

     amountEscrowed[_buyer][_seller] = amountEscrowed[_buyer][_seller].sub(_payment);
     emit released(_buyer, _seller, _refNo, _payment, block.timestamp);
   }

   function refundPayment(address _seller, address _buyer, uint256 _refNo) public onlyAdmin {
     require(product.isUser(_seller) == true);
     require(product.isUser(_buyer) == true);
     require(amountEscrowed[_buyer][_seller] > 0);
     require(paymentInfo[_refNo].paymentStatus == Status.Escrowed);

     uint256 _payment = amountEscrowed[_buyer][_seller];
     //msg.sender.send()
     if (paymentInfo[_refNo].mode == PaymentMode.Ether){
       _buyer.transfer(_payment.mul(10**18));
     }

     paymentInfo[_refNo].paymentStatus = Status.Refunded;
     amountEscrowed[_buyer][_seller] = amountEscrowed[_buyer][_seller].sub(_payment);
     emit refund(_buyer, _seller, _refNo, _payment, block.timestamp);
   }

 }

// Creating , retrieving , product sale promotions by name and location
contract promotions is products{
//using SafeMath for uint256;

products product;

uint public noOfPromotions;


struct promotion{
  uint promotionIndex;
  string product;
  string productPic;
  string productAddress;
  string promotion;
  address productProducer;
}


event newPromotion(string promotedProduct, string productPosition, string promotionName, address producedBy);


mapping(address  => promotion) public lookUpPromotions;
mapping (string => promotion) searchPromotionByName;

mapping(bytes32 => bool) isPromotion;

constructor(products _product) public{
        require(msg.sender != address(0));
        product = _product;
    }

function setPromotion(
string _product,
string _productPic,
string _productAddress,
string _promotion,
address _productProducer
) public{
require( product.isUser(_productProducer) == true);
//require(product.checkProduct(_product) == true);
//require(product.checkDestination(_productAddress) == true);
bytes32 PromotionCheck = keccak256(abi.encodePacked(_promotion));
 uint _promotionIndex = noOfPromotions;
require(isPromotion[PromotionCheck] == false);
 lookUpPromotions[_productProducer].promotionIndex = _promotionIndex;
 lookUpPromotions[_productProducer].product = _product;
 lookUpPromotions[_productProducer].productPic = _productPic;
 lookUpPromotions[_productProducer].productAddress = _productAddress;
 lookUpPromotions[_productProducer].promotion = _promotion;
 lookUpPromotions[_productProducer].productProducer = _productProducer;

 searchPromotionByName[_promotion].promotionIndex = _promotionIndex;
 searchPromotionByName[_promotion].product = _product;
 searchPromotionByName[_promotion].productPic = _productPic;
 searchPromotionByName[_promotion].productAddress = _productAddress;
 searchPromotionByName[_promotion].promotion = _promotion;
 searchPromotionByName[_promotion].productProducer = _productProducer;

isPromotion[PromotionCheck] == true;
incrementPromotions();

 emit newPromotion(_product, _productAddress, _promotion, _productProducer);
}

 function incrementPromotions() internal {
   noOfPromotions = noOfPromotions + 1;
 }

 function getPromotionByName(
   string _promotionTitle
   ) public view returns(string, string, string, string, address){
     require( product.isUser(msg.sender) == true);
    // require(product.checkProduct(_productName) == true);
     //require(product.isProduct[_productName] == true);
     bytes32 PromotionCheck = keccak256(abi.encodePacked(_promotionTitle));
     require (isPromotion[PromotionCheck] == true);
     string storage _productAbbrev =  searchPromotionByName[_promotionTitle].product;
     string storage _productPicture = searchPromotionByName[_promotionTitle].productPic;
     string storage _productAddress = searchPromotionByName[_promotionTitle].productAddress;
     string storage _promotion = searchPromotionByName[_promotionTitle].promotion;
     address _productProducer = searchPromotionByName[_promotionTitle].productProducer;
     return(
       _productAbbrev,
       _productPicture,
       _productAddress,
       _promotion,
       _productProducer
       );
   }
}
