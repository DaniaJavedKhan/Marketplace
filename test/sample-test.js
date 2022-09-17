

describe("NFTMarket", function () {
  it("Should", async function () {
      const Market = await ethers.getContractFactory("NFTMarket");   //reference of market
      const market = await Market.deploy();         // wait to deploy the market
      await market.deployed();
      const marketAddress = market.address;           //market address from which it deployed

      const NFT = await ethers.getContractFactory("NFT");
      const nft = await NFT.deploy(marketAddress);
      await nft.deployed();
      const nftAddress = nft.address;

      //to know how much listing prices
      let listingPrice = await market.getListingPrice();
      listingPrice = listingPrice.toString();

      //how much
      const auctionPrice = ethers.utils.parseUnits('100','ether') //allows to working with whole units

      await nft.mintToken("https://www.mytokenlocation.com")
      await nft.mintToken("https://www.mytokenlocation2.com")

      await market.createMarketItem(nftAddress, 1, auctionPrice, {value: listingPrice})
      await market.createMarketItem(nftAddress, 2, auctionPrice, {value: listingPrice})

      const [_, buyerAddress] = await ethers.getSigners()

      await market.connect(buyerAddress).createMarketSale(nftAddress, 1, {value: auctionPrice})

      let items = await market.fetchMarketItems()

      //console.log('items: ', items)
      items = await Promise.all(items.map(async i => {
        const Uri = await nft.tokenURI(i.tokenId)
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.owner,
          Uri
        }
        return item
      }))

      console.log('items: ', items)

  });
});