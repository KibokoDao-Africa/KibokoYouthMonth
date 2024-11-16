// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Analytics {
    mapping(uint256 => uint256) public views;
    mapping(uint256 => uint256) public likes;
    mapping(uint256 => uint256) public dislikes;
    mapping(uint256 => uint256) public ratings;
    mapping(uint256 => uint256) public share;


    // Track content views
    function trackView(uint256 _id) external {
        views[_id]++;
    }

    // Track content likes
    function trackLike(uint256 _id) external {
        likes[_id]++;
    }

    // Track content dislikes
    function trackDislike(uint256 _id) external {
        dislikes[_id]++;
    }

    // Track content share
    function trackShare(uint256 _id) external {
        share[_id]++;
    }

    // Track content ratings
    function trackRating(uint256 _id, uint256 _rating) external {
        ratings[_id] = _rating;
    }
}
