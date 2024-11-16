pragma solidity ^0.4.23;
//import "./SafeMath.sol";
//import "./products.sol";
import "./users.sol";
/**
 * @title Promotions Management Smart Contract
 *
 * @dev	Allows farmers to create and manage promotions for each product they produce based on their location, product picture, and custom description
 * @author Kelvin Ndereba
 * GandH Blockchain Solutions
 */

 // Creating , retrieving , product sale promotions by name and location
 contract promotions {
 //using SafeMath for uint256;

 users public user;

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

 constructor(users _user) public{
         require(msg.sender != address(0));
         user = _user;
     }

 function setPromotion(
 string _product,
 string _productPic,
 string _productAddress,
 string _promotion,
 address _productProducer
 ) public{
 require(user.isUser(_productProducer) == true);
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
      require( user.isUser(msg.sender) == true);
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
