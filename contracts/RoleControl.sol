pragma solidity ^0.8.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";

contract RoleControl is AccessControl {
  bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER");
  bytes32 public constant HEALER_ROLE = keccak256("HEALER");

  constructor () {
    // NOTE: Other DEFAULT_ADMIN's can remove other admins, give this role with great care
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender); // The creator of the contract is the default admin

    // SETUP role Hierarchy:
    _setRoleAdmin(VERIFIER_ROLE, DEFAULT_ADMIN_ROLE);
    _setRoleAdmin(HEALER_ROLE, VERIFIER_ROLE);
    _setRoleAdmin(HEALER_ROLE, DEFAULT_ADMIN_ROLE);
  }


  function isAdmin(address account) public virtual view returns(bool){
    return hasRole(DEFAULT_ADMIN_ROLE, account);
  }

  function isVerifier(address account) public virtual view returns(bool){
    return hasRole(VERIFIER_ROLE, account);
  }

  function isHealer(address account) public virtual view returns(bool){
    return hasRole(HEALER_ROLE, account);
  }

  // Create a modifier that can be used in other contract to make a pre-check
  modifier onlyAdmin() {
    require(isAdmin(msg.sender), "Restricted to admins.");
    _;
  }

  modifier onlyVerifier() {
    require(isVerifier(msg.sender), "Restricted to verifiers.");
    _;
  }

  modifier onlyHealer() {
    require(isHealer(msg.sender), "Restricted to healers.");
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

  // Add Healer role to an address
  function addHealer(address account) public virtual onlyVerifier {
    grantRole(HEALER_ROLE, account);
  }

  // Remove a user address as a admin
  function removeAdmin(address account) public virtual onlyAdmin {
    revokeRole(DEFAULT_ADMIN_ROLE, account);
  }

  // Remove Verifier role from an address
  function removeVerifier(address account) public virtual onlyAdmin {
    revokeRole(VERIFIER_ROLE, account);
  }

  // Remove Healer role from an address
  function removeHealer(address account) public virtual onlyVerifier {
    revokeRole(HEALER_ROLE, account);
  }
}