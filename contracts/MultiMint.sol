//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ITarget is IERC721 {
    function publicMint() external;

    function totalSupply() external view returns (uint256);
}

contract Minter {
    constructor(address addr, address to) {
        ITarget(addr).publicMint();
        uint256 mintedID = ITarget(addr).totalSupply();
        ITarget(addr).transferFrom(address(this), to, mintedID);
        selfdestruct(payable(to));
    }
}

contract MultiMint is Ownable {
    constructor() {}

    function bulkMint(
        address addr,
        address to,
        uint256 n
    ) public onlyOwner {
        // can use function signature instead to reuse
        for (uint256 i = 0; i < n; i++) {
            Minter minter = new Minter(addr, to);
        }
    }

    function sd() external onlyOwner {
        selfdestruct(payable(owner()));
    }
}
