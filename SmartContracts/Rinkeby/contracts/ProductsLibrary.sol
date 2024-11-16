pragma solidity ^0.4.22;
import "./ExternalStorage.sol";

/**
 * @title Product Information Management Smart Contract
 *
 * @dev	Manages secure creation and retrieval of each product detail and allows quantity management after every purchase
 * @author Kelvin Ndereba
 * GandH Blockchain Solutions
 */
//enum Grade {Grade1, Grade2, Grade3}

library ProductsLibrary {
 //    1. Product ID   2. Product Name   3. Product Description 4. product Location 5. Product Price
 //    6. Product Producer  7. Product Grade 8. Product Quality 9. Product Image 10. Product quantity
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
