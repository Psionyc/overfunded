// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract OverfundedNFT is ERC721, ERC721URIStorage, Ownable {
    //For testing purposes only
    string URI_OVERRIDE = "https://raw.githubusercontent.com/Psionyc/overfunded/master/contract/nft_metadata.json";

    constructor() ERC721("OverfundedNFT", "ONFT") {}

    function safeMint(address to, uint256 tokenId, string memory _uri)
    
        public
        onlyOwner
    {      
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}