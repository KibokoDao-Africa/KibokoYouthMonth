pragma solidity ^0.4.23;

/**
 * @title External Storage Smart Contract
 *
 * @dev	a storage contract that allows storage and conversions of different data types based on a standard bytes32 format as required by inheriting contracts
 * @author Kelvin Ndereba
 * GandH Blockchain Solutions
 */

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
