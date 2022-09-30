import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

import { ethers } from "ethers"
import { useEffect, useState } from "react"
import axios from "axios"
import Web3Modal from "web3modal"

import {
  nftAddress, marketplaceAddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function Dashboard() {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])

  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(marketplaceAddress, NFTMarket.abi, signer)
    const tokenContract = new ethers.Contract(nftAddress,NFT.abi, provider)
    const data = await marketContract.fetchItemsCreated()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(`https://${tokenUri}`)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
      }
      return item
    }))

    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('Loaded')
  }
  return (
    <>
     <Navbar />
     
    <div className="flex justify-center">
      <div className="p-4"><br></br><br></br>
        <h2 className="text-2xl py-2">Items Created</h2>
        <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4" >
        {
          nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img style={{ height: '254px', maxWidth:'389px'}} src={nft.image} />
              <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">Price-{nft.price} Matic</p>
              </div>
            </div>
            
          ))
        }
      </div>
      </div>
      </div><br></br><br></br>
      


      <div className="px-4"> 
      <div className="soldclass">
      {
        Boolean(sold.length) && (
          
            <div className="p-4">
            <h2 className="text-2xl py-2">Items sold</h2>
            <div className="px-4" style={{ maxWidth: '1600px' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4" >
            {
              sold.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                  <img style={{ height: '254px', maxWidth: '389px' }}  src={nft.image} />
                  <div className="p-4 bg-black">
                    <p className="text-2xl font-bold text-white">Price - {nft.price} Matic</p>
                  </div>
                </div>
              ))
            }
            </div><br></br><br></br><br></br><br></br><br></br>
            </div>
          </div>
        )
      }
      </div>
    </div>
    </div>
     <Footer /> 
    </>
  )
}

