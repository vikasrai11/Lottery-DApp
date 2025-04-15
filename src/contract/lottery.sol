// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is Ownable {
    address payable[] public players;
    address public recentWinner;
    uint256 public entryFee;

    constructor(uint256 _entryFee) Ownable(msg.sender) {
        entryFee = _entryFee;
    }

    function enterLottery() public payable {
        require(msg.value >= entryFee, "Not enough ETH sent!");
        players.push(payable(msg.sender));
    }

    function pickWinner() public onlyOwner {
        require(players.length > 0, "No players in the lottery!");
        uint256 winnerIndex = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.prevrandao,
                    players.length
                )
            )
        ) % players.length;

        recentWinner = players[winnerIndex];
        payable(recentWinner).transfer(address(this).balance);
        delete players;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
