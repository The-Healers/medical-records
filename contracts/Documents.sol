pragma solidity ^0.8.0;
//SPDX-License-Identifier: MIT

import "./RoleControl.sol";
// import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";

contract Documents is RoleControl {
    mapping (address => string[]) public document_keys;

    // Set a new document key
    function update(string memory _key, address _patient) public {
        if (isHealer(msg.sender)) {
            document_keys[_patient].push(_key);
        } else {
            document_keys[msg.sender].push(_key);
        }
    }

    // Get document keys by address
    function get(address _patient) view public returns(string[] memory) {
        if (isHealer(msg.sender)) {
            return document_keys[_patient];
        } else {
            return document_keys[msg.sender];
        }
    }
}