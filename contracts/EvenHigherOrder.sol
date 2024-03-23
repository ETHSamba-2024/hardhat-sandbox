// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

contract EvenHigherOrder {
  address public commander;

  uint256 public treasury;

  function registerTreasury(uint8) public {
    assembly {
      sstore(treasury.slot, calldataload(4))
    }
    treasury = (uint256(uint160(tx.origin)) << 96) | uint96(treasury);
  }

  function claimLeadership(uint256 secret) public {
    if (uint96(secret) > 255 && address(uint160(secret >> 96)) == msg.sender)
      commander = msg.sender;
    else revert("Only members of the Higher Order can become Commander");
  }
}
