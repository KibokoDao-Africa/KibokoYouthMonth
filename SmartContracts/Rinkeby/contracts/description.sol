pragma solidity ^0.4.23;
import "./SafeMath.sol";
//import "./products.sol";
import "./users.sol";
/**
 * @title Agricultural Products Specifications Smart Contract
 *
 * @dev	Keeps track of  each produce specifactions, standard, grade, and condition
 * @author Kelvin Ndereba
 * GandH Blockchain Solutions
 */

 /**
   * @dev Add and Get Product Description , standard and Features Smart Contract
 **/
 contract description  {
  using SafeMath for uint256;
  //products public product;
  users public user;
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

 event productDescription(string _itsName, ProductGrade _itsGrade, string _itsSpecies, uint256 _itsMoisture, uint256 _itsCaffeineContent, uint256 _AflatoxinContent);

 mapping(address => mapping(bytes32 => descriptions)) public addDescriptions;

 constructor(users _user) public{
         require(msg.sender != address(0));
         user = _user;
     }

 function addProductDescription(
   ProductType _type,
   string _name,
   ProductGrade _grade,
   string _species,
   uint256 _moisture,
   uint256 _caffeineContent,
   uint256 _aflatoxin
 ) public returns(address, ProductType, ProductGrade,  string, uint256, uint256, uint256){
     require(user.isUser(msg.sender) == true);

     bytes32 byteName = keccak256(abi.encodePacked(_name));
    // require(product.checkProduct(_name) == true);
     addDescriptions[msg.sender][byteName].name = _name;
     addDescriptions[msg.sender][byteName].category = _type;
     addDescriptions[msg.sender][byteName].grade = _grade;
     addDescriptions[msg.sender][byteName].species = _species;
     addDescriptions[msg.sender][byteName].moisture = _moisture.mul(100);
     addDescriptions[msg.sender][byteName].caffeineContent = _caffeineContent.mul(100);
     addDescriptions[msg.sender][byteName].aflatoxin = _aflatoxin.mul(100);

     emit productDescription(_name, _grade, _species, _moisture, _caffeineContent, _aflatoxin);
     return(msg.sender, _type, _grade, _species, _moisture, _caffeineContent, _aflatoxin);
   }

   function getProductDescription(
     address _producer,
     string _productName
   )public view  returns (
       ProductType _category,
       string _name,
       ProductGrade _grade,
       string _species,
       uint256 _moisture,
       uint256 _caffeineContent,
       uint256  _aflatoxin
       ){
       require(user.isUser(msg.sender) == true);
       bytes32 productName = keccak256(abi.encodePacked(_productName));
       _category = addDescriptions[_producer][productName].category;
       _name = addDescriptions[_producer][productName].name;
       _grade = addDescriptions[_producer][productName].grade;
       _species = addDescriptions[_producer][productName].species;
       _moisture = addDescriptions[_producer][productName].moisture.div(100);
        _caffeineContent = addDescriptions[_producer][productName].caffeineContent.div(100);
       _aflatoxin = addDescriptions[_producer][productName].aflatoxin.div(100);
       return(
         _category,
         _name,
         _grade,
         _species,
         _moisture,
         _caffeineContent,
         _aflatoxin
         );
       }
 }
