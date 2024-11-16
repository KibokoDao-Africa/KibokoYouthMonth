// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ProduceManagement.sol";

contract ProduceOwnershipV2 {

    enum OperationType {UNIT, PRODUCE}
    mapping(bytes32 => address) public currentConsignmentOwner;
    mapping(bytes32 => address) public currentProduceOwner;

    event TransferConsignmentOwnership(bytes32 indexed p, address indexed account);
    event TransferProduceOwnership(bytes32 indexed p, address indexed account);
    ProduceManagement public promg;

    constructor(address prod_contract_address) public {
        //Just create a new auxiliary contract. We will use it to check if the consignment or produce really exist
        promg = ProduceManagement(prod_contract_address);
    }

    function addOwnership(address owner, uint op_type, bytes32 p_hash) public returns (bool) {
        bool retType = false;
        if(op_type == uint(OperationType.UNIT)){
            address farmer;
            (farmer, , , ) = promg.consignments(p_hash);
            require(owner == farmer, "Consignment owner mismatch");
            require(currentConsignmentOwner[p_hash] == address(0), "Consignment was already registered");
            //require(currentConsignmentOwner[p_hash] == msg.sender, "Consignment was not made by requester");
            currentConsignmentOwner[p_hash] = owner;
            emit TransferConsignmentOwnership(p_hash, owner);
            retType = true;
        } else if (op_type == uint(OperationType.PRODUCE)){ 
            address farmer;  
            (farmer, , , ) = promg.produces(p_hash);
            require(owner == farmer, "Produce owner mismatch");
            require(currentProduceOwner[p_hash] == address(0), "Produce was already registered");
            //require(currentProduceOwner[p_hash] == msg.sender, "Produce was not made by requester");
            currentProduceOwner[p_hash] = owner;
            emit TransferProduceOwnership(p_hash, owner);
            retType = true;
            
        }
        return retType;
    }

    function changeOwnership(address owner, uint op_type, bytes32 p_hash, address to) public returns (bool) {
      //Check if the element exists and belongs to the user requesting ownership change
        bool resType = false;
        if(op_type == uint(OperationType.UNIT)){
            address farmer;
            (farmer, , , ) = promg.consignments(p_hash);
            require(owner == farmer, "Consignment owner mismatch");
            require(currentConsignmentOwner[p_hash] == owner, "Consignment is not owned by requester");
            currentConsignmentOwner[p_hash] = to;
            emit TransferConsignmentOwnership(p_hash, to);
            resType = true;

        } else if (op_type == uint(OperationType.PRODUCE)){
            address farmer;
            (farmer, , , ) = promg.produces(p_hash);
            require(owner == farmer, "Produce owner mismatch");
            require(currentProduceOwner[p_hash] == owner, "Produce is not owned by requester");
            currentProduceOwner[p_hash] = to;
            emit TransferProduceOwnership(p_hash, to);
            //Change consignment ownership too
            bytes32[6] memory unit_list = promg.getConsignments(p_hash);
            for(uint i = 0; i < unit_list.length; i++){
                currentConsignmentOwner[unit_list[i]] = to;
                emit TransferConsignmentOwnership(unit_list[i], to);
            }
            resType = true;

        }
        return resType;
    }
}
