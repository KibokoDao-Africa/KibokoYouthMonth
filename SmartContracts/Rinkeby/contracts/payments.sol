pragma solidity ^0.4.23;
import "./SafeMath.sol";
import "./products.sol";
import "./orders.sol";
import "./users.sol";
/**
 * @title Payment and Escrow Management Smart Contract
 *
 * @dev	Keeps track of  each  payment transaction or value exchange to or from the farmer and buyer
 * @author Kelvin Ndereba
 * GandH Blockchain Solutions
 */

 /**
  * @notice payment escrow SmartContract
  */
 contract payments  {
 using SafeMath for uint256;

 products public product;

 users  public user;

 address public escrowAccount;

 orders public order;
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

 constructor(products _product, address _escrowAccount, orders _order, users _user) public{
         require(msg.sender != address(0));
         product = _product;
         order = _order;
         user = _user;
         escrowAccount = _escrowAccount;
     }



 function pay(
   address _fromAccount,
   address _toAccount,
   uint256 _quantity,
   uint256 _amount,
   PaymentMode _payMode,
   uint _orderNumber
 )public  payable{
      require(user.isUser(msg.sender) == true);
      require(user.isUser(_toAccount) == true);
      require(user.isUser(_fromAccount) == true);
      require(product.amountPayable(_fromAccount ,_orderNumber) > 0);
      require(product.amountRecievable(_toAccount, _orderNumber) > 0);
      if (_payMode == PaymentMode.Ether){
      _amount = msg.value.div(10**18);
      }
      require(_amount >= order.getOrderAmount(_orderNumber));
      if (_payMode == PaymentMode.Ether && _amount > order.getOrderAmount(_orderNumber)){
        _amount = product.amountPayableEth(_fromAccount, _orderNumber).mul(10**18);
        msg.sender.transfer(msg.value.sub(_amount));
        escrowAccount.transfer(_amount);
        product.setAmountPayableEth(_fromAccount, _orderNumber, _amount);
        product.setAmountRecievableEth(_toAccount, _orderNumber, _amount);
        //amountToPayEth[msg.sender][_orderNumber] = amountToPayEth[msg.sender][_orderNumber].sub(_amount);
        //amountToRecieveEth[_toAccount][_orderNumber] = amountToPayEth[_toAccount][_orderNumber].sub(_amount);
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

    function releasePayment(address _seller, address _buyer, uint _refNo) public {
      require(user.isUser(msg.sender) == true);
      require(user.isUser(_seller) == true);
      require(user.isUser(_buyer) == true);
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

    function refundPayment(address _seller, address _buyer, uint256 _refNo) public  {
      require(user.isUser(msg.sender) == true);
      require(user.isUser(_seller) == true);
      require(user.isUser(_buyer) == true);
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
