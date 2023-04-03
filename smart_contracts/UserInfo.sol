//This contract is used to record the user's weight and calorie needs

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract UserInfo {
    struct User {
        uint256 weight; // user's weight
        uint256 calorieNeed; // user's daily calorie needs
    }

    mapping(address => User) private users; //Map addresses to unique users

    // event emitted when user updates their information
    event UserInfoUpdated(
        address indexed user,
        uint256 weight,
        uint256 calorieNeed,
        uint256 timestamp
    );

    // function to set user's information
    function setUserInfo(uint256 _weight, uint256 _calorieNeed) public {
        users[msg.sender] = User(_weight, _calorieNeed);
        emit UserInfoUpdated(
            msg.sender,
            _weight,
            _calorieNeed,
            block.timestamp
        );
    }

    // function to get user's information
    function getUserInfo() public view returns (uint256, uint256) {
        // only the user can view their information
        require(
            msg.sender == tx.origin,
            "Only the user can view their information."
        );
        User storage user = users[msg.sender];
        return (user.weight, user.calorieNeed);
    }
}
