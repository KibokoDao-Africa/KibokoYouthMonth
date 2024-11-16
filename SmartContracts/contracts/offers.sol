pragma solidity ^0.4.23;
import "./SafeMath.sol";
import "./products.sol";

/**
 * @title Offer Management Smart Contract
 *
 * @dev	Allows farmers to create most suitable offers based on the type of product they produce and their location
 *              Allows buyers to access most suitable available offers based on the produce name and location
 * @author Kelvin Ndereba
 * GandH Blockchain Solutions
 */

 /**
 * @notice Creating Product and Manipulating Sale Offers Based on Farmers Location Smart Contract
**/
 contract offers{
 //using SafeMath for uint256;

 users public user;


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


 constructor(users _user) public{
         require(msg.sender != address(0));
         user = _user;
     }

 function setOffer(
   string _offerName,
   string _productName,
   string _productPicture,
   string _productLocation,
    address _productSource,
    string _productLink,
    uint256  _offerQuantity
    ) public {
   require(user.isUser(msg.sender) == true);
   require(user.isUser(_productSource) == true);
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
   )public view returns (string, string, address, string, uint256){
     require(user.isUser(msg.sender) == true);
     require(user.isUser(_bidder) == true);
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
