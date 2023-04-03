//Token rewards can be obtained after reaching the target weight within 28 days.

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./NutrakrToken.sol";

contract Challenge {
    struct ChallengerData {
        bool isInChallenge;
        uint256 weight; // The weight of the challenger at the start of the challenge.
        uint256 goalWeight; // The weight goal the challenger wants to reach.
        uint256 challengeStartTime; // The time when the challenger started the challenge.
        bool isSucceeded; // Indicates whether the challenger has succeeded in the challenge，after succeeds, they cannot challenge again.
    }

    mapping(address => ChallengerData) private challengers;

    NutrakrToken private nutrakrToken;

    constructor(address _nutrakrToken) {
        nutrakrToken = NutrakrToken(_nutrakrToken);
    }

    function startChallenge(uint256 _weight, uint256 _goalWeight) public {
        // Only start a new challenge when the challenger is not in an ongoing challenge and the target weight must not equal the current weight.
        require(
            !challengers[msg.sender].isInChallenge,
            "You are already in a challenge."
        );
        require(
            _weight != _goalWeight,
            "The value of the target weight must not be equal to the current weight."
        );
        challengers[msg.sender] = ChallengerData(
            true,
            _weight,
            _goalWeight,
            block.timestamp,
            false
        );
    }

    function receiveReward(uint256 _currentWeight) public {
        ChallengerData storage stats = challengers[msg.sender];
        // The challenger must be in a challenge to receive a reward.
        require(stats.isInChallenge, "You are not in challenging.");
        // The challenger must not have succeeded in the challenge before.
        require(
            !stats.isSucceeded,
            "You have already succeeded in the challenge."
        );
        // The challenger must have been in the challenge for 28 days to receive a reward
        require(
            block.timestamp >= stats.challengeStartTime + 28 days,
            "You have not been in the challenge for 28 days yet."
        );
        // Judging whether the goal is achieved, if gain weight, current weight must greater or equal to target weight. and if you lose weight, current weight must less or equal to target weight.
        require(
            (stats.goalWeight > stats.weight &&
                _currentWeight >= stats.goalWeight) ||
                (stats.goalWeight < stats.weight &&
                    _currentWeight <= stats.goalWeight),
            "Your current weight is not in line with your goal weight."
        );
        nutrakrToken.safeMint(msg.sender);
        stats.isSucceeded = true;
    }

    function getChallengerData() public view returns (ChallengerData memory) {
        // Only the challenger can view their own data
        require(
            msg.sender == tx.origin,
            "Only the user can view their information."
        );
        ChallengerData storage challengerInfo = challengers[msg.sender];
        return challengerInfo;
    }
}
