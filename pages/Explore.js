import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import ExploreNav from "../Components/ExploreNav"
import ArtNav from "../Components/ArtNav"

import { ethers } from 'ethers';
//useState is a Hook that allows you to have state variables in functional components.
//useEffect is a Hook that allows you to invoke afunction when a component loads.
import { useEffect, useState } from 'react';
import axios from 'axios';  //data fetching library
import Web3Modal from "web3modal" //way for us to connect with someone ethereum wallet
import { nftAddress, marketplaceAddress } from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'



const Explore = () => {
  const [nfts, setNfts] =useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');

  useEffect(() => {
    loadNFTs()
  }, [])

  async function loadNFTs(){
    const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/");
    const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(marketplaceAddress, Market.abi, provider);
    const data = await marketContract.fetchMarketItems();
    console.log(data);

    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(`https://${tokenUri}`);
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price, 
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded')
  }

  async function buyNft(nft) {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection)

    const singer = provider.getSigner();
    const contract = new ethers.Contract(marketplaceAddress, Market.abi, singer);

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');

    const transaction = await contract.createMarketSale(nftAddress, nft.tokenId, {
      value: price
    })
    await transaction.wait();
    loadNFTs();
  }
  
  if (loadingState === 'loaded' && !nfts.length) return(
    <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
  )

  return (
<>
<Navbar />

      <div className="ex">
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner-Ex">
        <div className="carousel-item active Ex">
        <img src="exploree.jpg" className="d-block w-100" alt="..." />
        </div>
    </div>

    </div>
<ExploreNav />


<div className="flex justify-center" >
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => {

              console.log(nft, '<<<<<')

              return(

              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img style={{ height: '264px', maxWidth:'400px'}} src={nft.image} />
                <div className="p-4" >
                  <p className="text-2xl font-semibold">{nft.name}</p>
                  <div>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">{nft.price} Matic</p>
                  <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                </div>
              </div>
              
            )})
          }
        </div>
      </div>
    </div>
    </div>

<Footer />
    
    </>
  )
}

export default Explore
