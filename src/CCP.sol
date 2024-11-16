// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Interface/IAuthorization.sol";
import "./Interface/IAnalytics.sol";
import "./Interface/ISubscription.sol";

contract CCP {
    IAuthorization public authorizationContract;
    IAnalytics public analyticsContract;
    ISubscription public subscriptionContract;

    struct vars {
        uint256 freeContentCount;

        ContentItem[] freeContentsArray;
        mapping(address => ContentItem[]) creatorFreeContents;
        mapping(address => uint256) creatorFreeContentCount;
        mapping(uint256 => ContentItem) freeContents;

        mapping(address => ContentItem[]) creatorExclusiveContents;
        mapping(address => uint256) creatorExclusiveContentCount;
        mapping(address => mapping(uint256 => ContentItem)) exclusiveContents;
        

        mapping(uint256 => mapping(address => uint256)) userFreeContentRatingTracker;
        mapping(uint256 => mapping(address => uint256)) userExclusiveContentRatingTracker;

        mapping(uint256 => uint256) freeContentRatingSum;
        mapping(address => mapping(uint256 => uint256)) exclusiveContentRatingSum;

        mapping(uint256 => uint256) freeContentRatingCount;
        mapping(address => mapping(uint256 => uint256)) exclusiveContentRatingCount;

        mapping(uint256 => mapping(address => bool)) freeContentLikeTracker;
        mapping(uint256 => mapping(address => bool)) exclusiveContentLikeTracker;

        mapping(uint256 => mapping(address => bool)) freeContentDislikeTracker;
        mapping(uint256 => mapping(address => bool)) exclusiveContentDislikeTracker;

        mapping(address => uint256) fetchExclusiveContentTimestamp;

        mapping(address => uint256) creatorRating;
        mapping(address => uint256) creatorRatingSum;
        mapping(address => uint256) creatorRatingCount;
        mapping(address => mapping(address => uint256)) userCreatorRatings;
    }

    struct ContentItem {
        string title;
        uint256 id;
        uint256 contentId;
        uint256 dateCreated;
        string creatorProfile;
        string ipfsHash;
        address creator;
        uint256 views;
        uint256 likes;
        uint256 dislikes;
        uint256 shares;
        uint256 rating;
        string contentType;
        string creatorImage;
    }
    
    vars appVars;

    constructor(address _authorization, address _analytic, address _subscription) {
        authorizationContract = IAuthorization(_authorization);
        analyticsContract = IAnalytics(_analytic);
        subscriptionContract = ISubscription(_subscription);
    }

    event FreeContentCreated(uint256 indexed id, address indexed creator, string creatorUsername, uint256  indexed timestamp);
    event ExclusiveContentCreated(uint256 indexed id, address indexed creator, string creatorUsername, uint256  indexed timestamp);

    event FreeContentDeleted(uint256 indexed freeContentID, address indexed creator, string creatorUsername, uint256  indexed timestamp);
    event ExclusiveContentDeleted(uint256 indexed exclusiveContentID, address indexed creator, string creatorUsername, uint256  indexed timestamp);

    event FreeContentLiked(uint256 indexed freeContentID, address indexed creator,  uint256 indexed timestamp);
    event ExclusiveContentLiked(uint256 indexed exclusiveContentID, address indexed creator, uint256 indexed timestamp);

    event FreeContentDisliked(uint256 indexed freeContentID, address indexed creator, uint256  indexed timestamp);
    event ExclusiveContentDisliked(uint256 indexed exclusiveContentID, address indexed creator, uint256 indexed timestamp);

    event FreeContentViewed(uint256 indexed id, address indexed creator, uint256 indexed timestamp);
    event ExclusiveContentViewed(uint256 indexed id, address indexed creator, uint256 indexed timestamp);

    event FreeContentRated(uint256 indexed id, address indexed creator, uint256 indexed timestamp, uint256 rating);
    event ExclusiveContentRated(uint256 indexed id, address indexed creator, uint256 indexed timestamp, uint256 rating);

    event CreatorRated(address indexed creator, uint256 indexed timestamp, uint256 rating);

    modifier onlyRegistered() {
        require(authorizationContract.checkRegisteredUsers(msg.sender), "User is not registered");
        _;
    }

    function createFreeContent(
        string memory _title,
        string memory _ipfsHash,
        string memory _contentType,
        string memory username,
        string memory _creatorImage
    ) public onlyRegistered {
        ContentItem memory newContent = ContentItem({
            title: _title,
            id: appVars.freeContentCount,
            contentId: appVars.creatorFreeContentCount[msg.sender],
            dateCreated: block.timestamp,
            creator: msg.sender,
            creatorProfile: username, 
            ipfsHash: _ipfsHash,
            views: 0,
            likes: 0,
            dislikes: 0,
            shares: 0,
            rating: 0,
            contentType: _contentType,
            creatorImage: _creatorImage 
        });

        appVars.freeContents[appVars.freeContentCount] = newContent;

        appVars.freeContentsArray.push(newContent);

        appVars.creatorFreeContents[msg.sender].push(newContent);

        emit FreeContentCreated(appVars.freeContentCount, msg.sender, username, block.timestamp);

        appVars.freeContentCount++;
        appVars.creatorFreeContentCount[msg.sender]++;
    }

    function createExclusiveContent(
        string memory _title,
        string memory _ipfsHash,
        string memory _contentType,
        string memory username,
        string memory _creatorImage
    ) public onlyRegistered {
        ContentItem memory newContent = ContentItem({
            title: _title,
            id: appVars.creatorExclusiveContentCount[msg.sender],
            contentId: appVars.creatorExclusiveContentCount[msg.sender],
            dateCreated: block.timestamp,
            creator: msg.sender,
            creatorProfile: username, 
            ipfsHash: _ipfsHash,
            views: 0,
            likes: 0,
            dislikes: 0,
            shares: 0,
            rating: 0,
            contentType: _contentType,
            creatorImage: _creatorImage 
        });

        appVars.exclusiveContents[msg.sender][appVars.creatorExclusiveContentCount[msg.sender]] = newContent;

        appVars.creatorExclusiveContents[msg.sender].push(newContent);

        emit ExclusiveContentCreated(appVars.creatorExclusiveContentCount[msg.sender], msg.sender, username, block.timestamp);

        appVars.creatorExclusiveContentCount[msg.sender]++;
    }


    function deleteFreeContent(uint256 _id) public onlyRegistered {
        ContentItem storage content = appVars.freeContents[_id];
        require(
            content.creator == msg.sender,
            "You are not the creator"
        );

        if (_id < appVars.freeContentsArray.length) {
            appVars.creatorFreeContents[msg.sender][content.contentId] = appVars.creatorFreeContents[msg.sender][appVars.creatorFreeContents[msg.sender].length - 1];
            appVars.creatorFreeContents[msg.sender][content.contentId].id = content.id;
            appVars.creatorFreeContents[msg.sender][content.contentId].contentId = content.contentId;
            
            appVars.freeContentsArray[_id] = appVars.freeContentsArray[appVars.freeContentsArray.length - 1];
            appVars.freeContentsArray[_id].id = content.id;
            appVars.freeContentsArray[_id].contentId = content.contentId;

            appVars.freeContents[_id] = appVars.freeContentsArray[_id];
            
            appVars.freeContentsArray.pop();
            appVars.creatorFreeContents[msg.sender].pop;

            appVars.freeContentCount--;
            appVars.creatorFreeContentCount[msg.sender]--;
        }

        emit FreeContentDeleted(_id, msg.sender, content.creatorProfile, block.timestamp);
    }

    function deleteExclusiveContent(uint256 _id) public onlyRegistered {
        ContentItem storage content = appVars.exclusiveContents[msg.sender][_id];
        require(
            content.creator == msg.sender,
            "You are not the creator"
        );

        if (_id < appVars.creatorExclusiveContents[msg.sender].length) {
            appVars.creatorExclusiveContents[msg.sender][_id] = appVars.creatorExclusiveContents[msg.sender][appVars.creatorExclusiveContents[msg.sender].length - 1];
            appVars.creatorExclusiveContents[msg.sender][_id].id = content.id;
            appVars.creatorExclusiveContents[msg.sender][_id].contentId = content.contentId;

            appVars.exclusiveContents[msg.sender][_id] = appVars.creatorExclusiveContents[msg.sender][_id];
            
            appVars.creatorExclusiveContents[msg.sender].pop();

            appVars.creatorExclusiveContentCount[msg.sender]--;
        }

        emit ExclusiveContentDeleted(_id, msg.sender, content.creatorProfile, block.timestamp);
    }

    function fetchFreeContent() public view returns(ContentItem[] memory){
        return appVars.freeContentsArray;
    }

    function fetchExclusiveContent(address _creator) public returns(ContentItem[] memory){
        require(subscriptionContract.checkSubscribtionToCreatorStatus(_creator, msg.sender), "You are not subscribed");
        appVars.fetchExclusiveContentTimestamp[msg.sender] = block.timestamp;
        return appVars.creatorExclusiveContents[_creator];
    }

    function fetchMyFreeContent(address _creator) public view returns(ContentItem[] memory){
        return appVars.creatorFreeContents[_creator];
    }

    function fetchMyExclusiveContent() public returns(ContentItem[] memory){
        appVars.fetchExclusiveContentTimestamp[msg.sender] = block.timestamp;
        return appVars.creatorExclusiveContents[msg.sender];
    }
 
    // function viewfreeContent(uint256 _id) public onlyRegistered {
    //     ContentItem memory content = appVars.freeContents[_id];

    //     appVars.freeContentsArray[_id].views++;
    //     appVars.freeContents[_id].views++;
    //     appVars.creatorFreeContents[content.creator][content.contentId].views++;

    //     emit FreeContentViewed(_id, content.creator, block.timestamp);
    //     analyticsContract.trackView(_id);
    // }

    // function viewExclusiveContent(uint256 _id, address _creator) public onlyRegistered {
    //     require(subscriptionContract.checkSubscribtionToCreatorStatus(_creator, msg.sender), "You are not subscribed");
    //     ContentItem memory content = appVars.exclusiveContents[_creator][_id];

    //     appVars.creatorExclusiveContents[_creator][_id].views++;
    //     appVars.exclusiveContents[_creator][_id].views++;
        
    //     emit ExclusiveContentViewed(_id, content.creator, block.timestamp);
    //     analyticsContract.trackView(_id);
    // }

    function likeFreeContent(uint256 _id) public onlyRegistered {
        ContentItem memory content = appVars.freeContents[_id];
        
        if (appVars.freeContentDislikeTracker[_id][msg.sender]){
            appVars.freeContentsArray[_id].dislikes--;
            appVars.freeContents[_id].dislikes--;
            appVars.creatorFreeContents[content.creator][content.contentId].dislikes--;

            appVars.freeContentDislikeTracker[_id][msg.sender] = false;
        }

        if(!appVars.freeContentLikeTracker[_id][msg.sender]){
            appVars.freeContentLikeTracker[_id][msg.sender] = true;

            appVars.freeContentsArray[_id].likes++;
            appVars.freeContents[_id].likes++;
            appVars.creatorFreeContents[content.creator][content.contentId].likes++;

            emit FreeContentLiked(_id, content.creator, block.timestamp);
            analyticsContract.trackLike(_id);
        }
    }

    function dislikeFreeContent(uint256 _id) public onlyRegistered {
        ContentItem memory content = appVars.freeContents[_id];
        
        if (appVars.freeContentLikeTracker[_id][msg.sender]){
            appVars.freeContentsArray[_id].likes--;
            appVars.freeContents[_id].likes--;
            appVars.creatorFreeContents[content.creator][content.contentId].likes--;

            appVars.freeContentLikeTracker[_id][msg.sender] = false;
        }

        if(!appVars.freeContentDislikeTracker[_id][msg.sender]){
            appVars.freeContentDislikeTracker[_id][msg.sender] = true;

            appVars.freeContentsArray[_id].dislikes++;
            appVars.freeContents[_id].dislikes++;
            appVars.creatorFreeContents[content.creator][content.contentId].dislikes++;

            emit FreeContentDisliked(_id, content.creator, block.timestamp);
            analyticsContract.trackLike(_id);
        }
    }

    function likeExclusiveContent(uint256 _id, address _creator) public onlyRegistered {
        require(subscriptionContract.checkSubscribtionToCreatorStatus(_creator, msg.sender), "You are not subscribed");
        ContentItem memory content = appVars.exclusiveContents[_creator][_id];

        if (appVars.exclusiveContentDislikeTracker[_id][msg.sender]){
            appVars.creatorExclusiveContents[_creator][_id].dislikes--;
            appVars.exclusiveContents[_creator][_id].dislikes--;

            appVars.exclusiveContentDislikeTracker[_id][msg.sender] = false;
        }

        if(!appVars.exclusiveContentLikeTracker[_id][msg.sender]){
            appVars.exclusiveContentLikeTracker[_id][msg.sender] = true;

            appVars.creatorExclusiveContents[_creator][_id].likes++;
            appVars.exclusiveContents[_creator][_id].likes++;

            emit ExclusiveContentLiked(_id, content.creator, block.timestamp);
            analyticsContract.trackLike(_id);
        }
    }

    function dislikeExclusiveContent(uint256 _id, address _creator) public onlyRegistered {
        require(subscriptionContract.checkSubscribtionToCreatorStatus(_creator, msg.sender), "You are not subscribed");
        ContentItem memory content = appVars.exclusiveContents[_creator][_id];

        if (appVars.exclusiveContentLikeTracker[_id][msg.sender]){
            appVars.creatorExclusiveContents[_creator][_id].likes--;
            appVars.exclusiveContents[_creator][_id].likes--;

            appVars.exclusiveContentLikeTracker[_id][msg.sender] = false;
        }

        if(!appVars.exclusiveContentDislikeTracker[_id][msg.sender]){
            appVars.exclusiveContentDislikeTracker[_id][msg.sender] = true;

            appVars.creatorExclusiveContents[_creator][_id].dislikes++;
            appVars.exclusiveContents[_creator][_id].dislikes++;

            emit ExclusiveContentDisliked(_id, content.creator, block.timestamp);
            analyticsContract.trackLike(_id);
        }
    }


    function rateFreeContent(uint256 _id, uint _rating) public onlyRegistered {
        require(_rating >= 1 && _rating <= 5, "Invalid rating");
        uint256 previousRating = appVars.userFreeContentRatingTracker[_id][msg.sender];

        if (!(previousRating < 1)) {
            appVars.freeContentRatingSum[_id] -= previousRating;
            appVars.freeContentRatingCount[_id] -= 1; 
        }

        appVars.freeContentRatingSum[_id] += _rating;
        appVars.freeContentRatingCount[_id] += 1;

        uint256 averageRating = (appVars.freeContentRatingSum[_id] / appVars.freeContentRatingCount[_id]) * 1 ether;

        ContentItem memory content = appVars.freeContents[_id];

        appVars.freeContentsArray[_id].rating = averageRating;
        appVars.freeContents[_id].rating = averageRating;
        appVars.creatorFreeContents[content.creator][content.contentId].rating = averageRating;

        appVars.userFreeContentRatingTracker[_id][msg.sender] = _rating;

        emit FreeContentRated(_id, content.creator, block.timestamp, _rating);
        analyticsContract.trackRating(_id, averageRating);
    }

    function rateExclusiveContent(uint256 _id, address _creator, uint256 _rating) public onlyRegistered {
        require(subscriptionContract.checkSubscribtionToCreatorStatus(_creator, msg.sender), "You are not subscribed");
        require(_rating >= 1 && _rating <= 5, "Invalid rating");
        uint256 previousRating = appVars.userExclusiveContentRatingTracker[_id][msg.sender];

        if (!(previousRating < 1)) {
            appVars.exclusiveContentRatingSum[_creator][_id] -= previousRating;
            appVars.exclusiveContentRatingCount[_creator][_id] -= 1; 
        }

        appVars.exclusiveContentRatingSum[_creator][_id] += _rating;
        appVars.exclusiveContentRatingCount[_creator][_id] += 1;

        uint256 averageRating = (appVars.exclusiveContentRatingSum[_creator][_id] / appVars.exclusiveContentRatingCount[_creator][_id]) * 1 ether;

        ContentItem memory content = appVars.freeContents[_id];

        appVars.creatorExclusiveContents[_creator][_id].rating = averageRating;
        appVars.exclusiveContents[_creator][_id].rating = averageRating;

        appVars.userExclusiveContentRatingTracker[_id][msg.sender] = _rating;

        emit FreeContentRated(_id, content.creator, block.timestamp, _rating);
        analyticsContract.trackRating(_id, averageRating);
    }

    function rateCreator(address creator, uint _rating) public onlyRegistered {
        require(_rating >= 1 && _rating <= 5, "Invalid rating");
        uint256 previousRating = appVars.userCreatorRatings[creator][msg.sender];

        if (!(previousRating < 1)) {
            appVars.creatorRatingSum[creator] -= previousRating;
            appVars.creatorRatingCount[creator] -= 1; 
        }

        appVars.userCreatorRatings[creator][msg.sender] = _rating;

        appVars.creatorRatingSum[creator] += _rating;
        appVars.creatorRatingCount[creator] += 1;

        uint256 averageRating = (appVars.creatorRatingSum[creator] / appVars.creatorRatingCount[creator]) * 1 ether;

        appVars.creatorRating[creator] = averageRating;

        emit CreatorRated(creator, block.timestamp, _rating);
    }

    function getCreatorRating(address _creator) public view returns(uint256){
        return appVars.creatorRating[_creator];
    }
}
