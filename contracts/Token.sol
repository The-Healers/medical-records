pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./RoleControl.sol";

contract Token is ERC721URIStorage, RoleControl, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  address contractAddress;

  constructor() ERC721("HealerToken", "HEAL") RoleControl() {
    console.log("Token constructor");
  }

  // Overide supportsInterface
  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  // Mint Token
  function createToken(address to, string memory tokenURI) public returns (uint256) {
    // require(hasRole(VERIFIER_ROLE, msg.sender), "Only verifier can mint token");
    require(isVerifier(msg.sender), "Only verifier can mint token");
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();

    _safeMint(to, newItemId);
    _setTokenURI(newItemId, tokenURI);
    return newItemId;
  }
  
  // Burn Token
  function burnToken(uint256 tokenId) public {
    require(isVerifier(msg.sender), "Only verifier can burn token");
    _burn(tokenId);
  }
}