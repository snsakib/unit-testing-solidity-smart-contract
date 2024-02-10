const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("NFTMarketplace", function () {
  async function deploySmartContractFixture() {
    const [owner, user1, user2] = await ethers.getSigners();

    const nftMarketplace = await ethers.deployContract("NFTMarketplace");
    await nftMarketplace.waitForDeployment();

    const listingPrice = await nftMarketplace.listingPrice();

    return { nftMarketplace, owner, user1, user2, listingPrice };
  }

  describe("mintNFT", function () {
    it("Should mint a new NFT", async () => {
      const { nftMarketplace, user1, listingPrice } = await loadFixture(
        deploySmartContractFixture
      );

      // Mint a new NFT
      await nftMarketplace
        .connect(user1)
        .mintNFT("NFT_URI", 100000000, { value: listingPrice });

      // Check if the NFT has been minted successfully
      const allNFTs = await nftMarketplace.getAllNFTs();
      expect(allNFTs.length).to.equal(1);
      expect(allNFTs[0].owner).to.equal(user1.address);
    });
  });
});
