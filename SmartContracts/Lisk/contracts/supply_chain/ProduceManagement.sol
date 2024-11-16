// SPDX-License-Identifier: MIT
// https://sepolia-blockscout.lisk.com/address/0xfe8dc8ccc0cbb71b55e5008e5401079df72b429c#code
pragma solidity ^0.8.24;

contract ProduceManagement {
    struct Consignment{
        address farmer;
        string consz_lot_number;
        string consignment_weight;
        string creation_date;
    }

    struct Produce{
        address farmer;
        string consz_lot_number;
        string produce_type;
        string creation_date;
        bytes32[6] consignments;
    }

    mapping(bytes32 => Consignment) public consignments;
    mapping(bytes32 => Produce) public produces;

    constructor() public {
    }

    function createHashFromInfo(address a1, string memory s1, string memory s2, string memory s3) public pure returns (bytes32){
        //First, get all values as bytes
        bytes20 b_a1 = bytes20(a1);
        bytes memory b_s1 = bytes(s1);
        bytes memory b_s2 = bytes(s2);
        bytes memory b_s3 = bytes(s3);

        //Then calculate and reserve a space for the full string
        string memory s_full = new string(b_a1.length + b_s1.length + b_s2.length + b_s3.length);
        bytes memory b_full = bytes(s_full);
        uint j = 0;
        uint i;
        for(i = 0; i < b_a1.length; i++){
            b_full[j++] = b_a1[i];
        }
        for(i = 0; i < b_s1.length; i++){
            b_full[j++] = b_s1[i];
        }
        for(i = 0; i < b_s2.length; i++){
            b_full[j++] = b_s2[i];
        }
        for(i = 0; i < b_s3.length; i++){
            b_full[j++] = b_s3[i];
        }

        //Hash the result and return
        return keccak256(b_full);
    }

    function registerConsignment(address farmer, string memory consz_lot_number, string memory consignment_weight, string memory creation_date) public returns (bytes32){
        //Create hash for data and check if it exists. If it doesn't, create the consignment and return the ID to the user
        bytes32 unit_hash = createHashFromInfo(farmer, consz_lot_number, consignment_weight, creation_date);
        
        require(consignments[unit_hash].farmer == address(0), "Consignment ID already used");

        Consignment memory new_unit = Consignment(farmer, consz_lot_number, consignment_weight, creation_date);
        consignments[unit_hash] = new_unit;
        return unit_hash;
    }

    function registerProduce(address farmer, string memory consz_lot_number, string memory produce_type, string memory creation_date, bytes32[6] memory unit_array) public returns (bytes32){
        //Check if all the consignments exist, hash values and add to produce mapping.
        uint i;
        for(i = 0;i < unit_array.length; i++){
            require(consignments[unit_array[i]].farmer != address(0), "Inexistent consignment used on produce");
        }

        //Create hash for data and check if exists. If it doesn't, create the consignment and return the ID to the user
        bytes32 produce_hash = createHashFromInfo(farmer, consz_lot_number, produce_type, creation_date);
        
        require(produces[produce_hash].farmer == address(0), "Produce ID already used");

        Produce memory new_produce = Produce(farmer, consz_lot_number, produce_type, creation_date, unit_array);
        produces[produce_hash] = new_produce;
        return produce_hash;
    }

    function getConsignments(bytes32 produce_hash) public view returns (bytes32[6] memory){
        //The automatic getter does not return arrays, so lets create a function for that
        require(produces[produce_hash].farmer != address(0), "Produce inexistent");
        return produces[produce_hash].consignments;
    }
}