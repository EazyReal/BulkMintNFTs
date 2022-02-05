//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract aERC721 is ERC721 {
    constructor() ERC721("MyToken", "MTK") {}
}
