pragma solidity ^0.8.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";

contract RoleControl is AccessControl {
  bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER");

  constructor () {
    // NOTE: Other DEFAULT_ADMIN's can remove other admins, give this role with great care
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender); // The creator of the contract is the default admin

    // SETUP role Hierarchy:
    _setRoleAdmin(VERIFIER_ROLE, DEFAULT_ADMIN_ROLE);
  }

  function isAdmin(address account) public virtual view returns(bool){
    return hasRole(DEFAULT_ADMIN_ROLE, account);
  }

  function isVerifier(address account) public virtual view returns(bool){
    return hasRole(VERIFIER_ROLE, account);
  }

  // Create a modifier that can be used in other contract to make a pre-check
  // That makes sure that the sender of the transaction (msg.sender)  is a admin
  modifier onlyAdmin() {
    require(isAdmin(msg.sender), "Restricted to admins.");
    _;
  }

  // Add a user address as a admin
  function addAdmin(address account) public virtual onlyAdmin {
    grantRole(DEFAULT_ADMIN_ROLE, account);
  }

  // Add Verifier role to an address
  function addVerifier(address account) public virtual onlyAdmin {
    grantRole(VERIFIER_ROLE, account);
  }
}