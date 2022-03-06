pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract AuthToken is ERC721URIStorage, AccessControl, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  address contractAddress;

  bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE"); 

  constructor() ERC721("HealerToken", "HEAL") {
    // Give deployer account all permissions
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  // Overide supportsInterface
  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  // Mint Token
  function createToken(address to, string memory tokenURI) public onlyRole(VERIFIER_ROLE) returns (uint256) {
    require(hasRole(VERIFIER_ROLE, msg.sender));
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();

    _safeMint(to, newItemId);
    _setTokenURI(newItemId, tokenURI);
    return newItemId;
  }
  
  // TODO Add functions for issuing and permissions of tokens
}