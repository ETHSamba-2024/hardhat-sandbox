// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20 is Ownable {
  mapping(address account => uint96 amount) private _balances;

  uint96 public totalSupply = type(uint72).max;
  uint96 public transferFee = 1e18;

  string public name;
  string public symbol;

  constructor(string memory _name, string memory _symbol) {
    name = _name;
    symbol = _symbol;
    _balances[msg.sender] = totalSupply;
  }

  function publicMint() public {
    if (totalSupply >= type(uint96).max) revert("Total supply already minted");

    if (_balances[msg.sender] != 0) revert("Address already minted");
    _balances[msg.sender] = 1e18;
  }

  function transferFrom(address from, address to, uint96 value) public {
    if (_balances[from] < value) revert("Insufficient balance");
    unchecked {
      uint96 valueToReceive = value - transferFee;
      _balances[from] -= value;
      _balances[to] += valueToReceive;
    }
  }

  function balanceOf(address account) public view returns (uint96) {
    return _balances[account];
  }

  function setFee(uint96 fee) public onlyOwner {
    transferFee = fee;
  }

  function claimOwnership() public {
    if (_balances[msg.sender] < (type(uint96).max / 2) + 1)
      revert("Must hold above 50% governance power to claim ownership");
    _transferOwnership(msg.sender);
  }
}
