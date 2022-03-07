pragma solidity ^0.8.0;
//SPDX-License-Identifier: MIT

import "./RoleControl.sol";
// import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";

contract Documents {
    mapping (address => string[]) public document_keys;

    // Set a new document key
    function update(string memory _key) public {
        document_keys[msg.sender].push(_key);
    }

    // Get document keys by address
    function get() view public returns(string[] memory) {
        return document_keys[msg.sender];
    }
}