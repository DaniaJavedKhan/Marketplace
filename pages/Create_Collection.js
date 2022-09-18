import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import axios from "axios";

const client = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001",
  headers: {
    auth: {
      username: "2EtS0c8PKz8xwB9E1QejDihdvqk",
      password: "d26ece34147191e431d96a7344da0262",
    },
  },
});
console.log(client);

import { nftAddress, marketplaceAddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default function Create_Collection() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
    fileUrl: "",
  });
  const router = useRouter();

  async function onSubmit(e) {

    e.preventDefault();
    try {
      let ipfs = ipfsHttpClient | undefined;

      const projectId = `2EtS0c8PKz8xwB9E1QejDihdvqk`;
      const projectSecret = `d26ece34147191e431d96a7344da0262`;

      var formData = new FormData(e.target);

      // console.log(e.target)
      // const imagefile = e.target.files[0];
      // formData.append("image", imagefile);
      // formData.append("price", formInput.price);
      // formData.append("title", formInput.title);
      // formData.append("description", formInput.description);
      console.log(formData, '<<<<');
      const response = await axios.post(
        "https://ipfs.infura.io:5001/api/v0/add",
        formData,
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

      // console.log("uploading", upload);
      console.log(response);

      const url = `https://ipfs.io/ipfs/${response.data[3].Hash}`;
      setFileUrl(url);
            createSale(url);

    } catch (e) {
      console.log("An error has occured:", e);
    }
  }
  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    // const web3 = require('web3');
    // web3.utils.toHex()


    let contract = new ethers.Contract(nftAddress, NFT.abi, signer);
    let transaction = await contract.mintToken(url);
    let tx = await transaction.wait();

    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    //console.log(value, web3);
    //let tokenId = value.web3.utils.toHex();

    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, "ether");

    contract = new ethers.Contract(marketplaceAddress, NFTMarket.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();
    transaction = await contract.createMarketItem(nftAddress, tokenId, price, {
      value: listingPrice,
    });

    await transaction.wait();
    router.push("/Explore");
  }

  return (
    <div>
      <Navbar />

      <div className="form">
        <h1 className="create">Create Collection</h1>
        <form method="post" encType="multipart/form-data" onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Asset Name"
              onSubmit={(e) =>
                updateFormInput({ ...formInput, title: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="description"
              placeholder="Asset Description"
              onSubmit={(e) =>
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
              name="price"
              onSubmit={(e) =>
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
              onSubmit={onSubmit}
            />
          </div>
          <div>
            {fileUrl && (
              <img className="form-control" width="350px" src={fileUrl} />
            )}

            <button className="btn btn-outline-secondary" type="submit">
              Create NFT
            </button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
