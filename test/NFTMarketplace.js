const { ethers } = require("hardhat");

describe("NFTMarketplace", function () {
  async function deploySmartContractFixture() {
    const [owner, user1, user2] = await ethers.getSigners();

    const nftMarketplace = await ethers.deployContract("NFTMarketplace");
    await nftMarketplace.waitForDeployment();

    const listingPrice = await nftMarketplace.listingPrice();

    return { nftMarketplace, owner, user1, user2, listingPrice };
  }
});
