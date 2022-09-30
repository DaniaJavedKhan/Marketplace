import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

import { ethers } from "ethers";
import axios from "axios"
import { useState } from "react";
import Web3Modal from "web3modal";
import { create, IPFSHTTPClient } from "ipfs-http-client";
import { useRouter } from "next/router";


import { nftAddress, marketplaceAddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default function Create_Collection() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    name: "",
    description: "",
    price: "",
  });
  const router = useRouter();

  async function onChange(e) {

    try{
      var Image = new FormData();
      const imagefile = e.target.files[0];
      // console.log(imagefile)
      Image.append("image", imagefile)
      const response = await axios.post(
        "https://ipfs.infura.io:5001/api/v0/add",
        Image,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          auth: {
            username: "2EtS0c8PKz8xwB9E1QejDihdvqk",
            password: "d26ece34147191e431d96a7344da0262",
          },
        }
      );


      console.log(response.data.Hash);

      const url = `https://ipfs.io/ipfs/${response.data.Hash}`;
      setFileUrl(url);
    } catch (e) {
      console.log("An error has occured:", e);
    }
  }

  async function createItem(e) {
    //upload to IPFS
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const jsonData = JSON.stringify({
      name: name,
      description: description,
      price: price,
      image: fileUrl,
    })
    const blob = new Blob([jsonData], {
      type:'application/json'
    })

    var data = new FormData();
    data.append("data", blob);
    
    try{
      var response = await axios.post(
        "https://ipfs.infura.io:5001/api/v0/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          auth: {
            username: "2EtS0c8PKz8xwB9E1QejDihdvqk",
            password: "d26ece34147191e431d96a7344da0262",
          },
        }
      );

      console.log("Final response:", response);
      const url = `ipfs.io/ipfs/${response.data.Hash}`;
      console.log("Hash Url: " + url);
      createSale(url);
    } catch (e) {
      console.log("Error uploading file: ", e);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(nftAddress, NFT.abi, signer);

    let transaction = await contract.mintToken(url);
    let tx = await transaction.wait();

    let event = tx.events[0];        //trigger transaction event
    let value = event.args[2];      //after validation store tokenId
    let tokenId = value.toNumber();

    console.log("tokenId:" +tokenId);

    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, "ether");

    contract = new ethers.Contract(marketplaceAddress, NFTMarket.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftAddress, tokenId, price, {
      value: listingPrice,
    });

    transaction.wait();
    router.push("/Explore");
  }

  return (
    <div>
      <Navbar />

      <div className="form">
        <h1 className="create">Create Collection</h1>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Asset Name"
            onChange={(e) =>
              updateFormInput({ ...formInput, name: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Asset Description"
            onChange={(e) =>
              updateFormInput({ ...formInput, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="Asset Price"
            onChange={(e) =>
              updateFormInput({ ...formInput, price: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            name="Asset"
            className="form-control"
            id="exampleFormControlInput3"
            placeholder="Asset Price in Eth"
            onChange={onChange}
          />
        </div>
        <div>
          {fileUrl && (
            <img className="form-control" width="350px" src={fileUrl} />
          )}

          <button className="btn btn-outline-secondary" onClick={createItem}>
            Create NFT
          </button><br></br><br></br><br></br><br></br>
        </div>
      </div>
      <Footer />
    </div>
  );
}
