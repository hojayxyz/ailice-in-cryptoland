// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// import "hardhat/console.sol";

contract Ailice {
    address public owner;
    mapping(address => uint256) public creditBalances;

    constructor() {
        owner = msg.sender;
    }

    function buyCredit() public {
        creditBalances[msg.sender] += 10;
    }

    function useCredit() public returns (bool) {
        require(creditBalances[msg.sender] > 1, "Out of credit!");
        creditBalances[msg.sender] -= 1;
        return true;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getBalanceOf(address account) public view returns (uint256) {
        return creditBalances[account];
    }
}
