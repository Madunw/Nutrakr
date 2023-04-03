//Issue NutrakrToken to reward those who succeed in the Challenge contract. The safeMint function can only be called by the Challenge contract

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NutrakrToken is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    address private _challenge; // Address of the Challenge contract.

    constructor() ERC721("NutrakrToken", "NTT") {}

    // to set the _challenge variable. Only the contract owner can call this function.
    function setChallengeAddress(address challenge) public onlyOwner {
        _challenge = challenge;
    }

    // to create and safely mint NutrakrToken.
    function safeMint(address to) public {
        require(
            msg.sender == owner() || msg.sender == _challenge, // Only the contract owner can call this function.
            "Only owner or challenge contract can mint tokens."
        );
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // to burn an NFT. Only the owner of the NFT can call this function.
    function burn(uint256 tokenId) external {
        require(
            ownerOf(tokenId) == msg.sender,
            "Only the owner of the token can burn it."
        );
        _burn(tokenId);
    }

    // to get the owner address of an NFT. Can only be used when the NFT exists.
    function ownerOf(uint256 tokenId) public view override returns (address) {
        require(_exists(tokenId), "Token does not exist.");
        return super.ownerOf(tokenId);
    }
}
