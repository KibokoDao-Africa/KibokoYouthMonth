// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAnalytics {
    // Track content views
    function trackView(uint256 _id) external;

    // Track content likes
    function trackLike(uint256 _id) external;

    // Track content dislikes
    function trackDislike(uint256 _id) external;

    // Track content share
    function trackShare(uint256 _id) external ;

    // Track content ratings
    function trackRating(uint256 _id, uint256 _rating) external;
}
