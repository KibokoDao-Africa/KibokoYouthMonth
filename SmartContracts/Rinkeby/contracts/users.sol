pragma solidity ^0.4.23;
contract users {
uint public noOfusers;
address public admin;

enum Roles {Admin, Farmer, Buyer}

event newUser(string _userName, Roles _userCategory, address _userAddress);

mapping (address => bool) public userList;
mapping(address => string) userLink;
mapping(address => Roles) userCategory;


constructor() public{
        require(msg.sender != address(0));
        admin = msg.sender;
    }
    modifier onlyUser(address _userAddress) {
        require(userList[_userAddress] == true, "Only Registered Users Allowed");
          _;
      }
    modifier onlyAdmin() {
       require(msg.sender == admin, "Only Admin Allowed");
       _;
    }

function addUser(
  string _name,
   Roles _category,
   address _user
 ) public onlyAdmin returns( string, Roles, address){
     require(_user != address(0));
      require(userList[_user] == false);
      userList[_user] = true;

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
          require(userList[_user] == true);
          userList[_user] = false;
          noOfusers = noOfusers - 1;
        }

        function isUser(address _user) view external returns (bool){
        return userList[_user];
        }
}
