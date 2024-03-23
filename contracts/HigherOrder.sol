// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

contract HigherOrder {
  address private _commander = msg.sender;

  uint256 public treasury;

  function commander() public view returns (address) {
    return _commander;
  }

  function registerTreasury(uint8) public {
    assembly {
      sstore(treasury.slot, calldataload(4))
    }
  }

  function claimLeadership() public {
    if (treasury > 255) _commander = msg.sender;
    else revert("Only members of the Higher Order can become Commander");
  }
}
