import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"

import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {nftAddress, marketplaceAddress } from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'


export default function Create_Collection () {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (e) {
      console.log(e)
    }  
  }
  async function createItem() {                   //upload to IPFS
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createSale() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    let contract = new ethers.Contract(nftAddress, NFT.abi, signer)
    let transaction = await contract.mintToken(url)
    let tx = await transaction.wait()

    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
    
    contract = new ethers.Contract(marketplaceAddress, NFTMarket.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    transaction = await contract.createMarketItem(nftAddress, tokenId, price, { value: listingPrice }
    )
    
    await transaction.wait()
    router.push('/Explore')
  }

    return (
      <div>
        <Navbar />
        
    <div className="form">
      <h1 className="create">Create Collection</h1>
      <div className="mb-3">
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Asset Name" onChange={e => updateFormInput({ ...formInput, name: e.target.value })}/>
      </div>
      <div className="mb-3">
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Asset Description" onChange={e => updateFormInput({ ...formInput, description: e.target.value })}></textarea>
      </div>
      <div className="mb-3">
        <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="Asset Price" onChange={e => updateFormInput({ ...formInput, price: e.target.value })}/>
      </div>
      <div className="mb-3">
        <input type="file" name= "Asset" className="form-control" id="exampleFormControlInput3" placeholder="Asset Price in Eth" onChange={onChange}/>
        </div>
        <div>
        {
          fileUrl && (
            <img className="form-control" width="350px" src={fileUrl} />
          )
        }
      
      <button className="btn btn-outline-secondary" onClick={createItem}>Create NFT
        </button>
        </div>


    </div>
    <Footer />

    </div>
  )
}