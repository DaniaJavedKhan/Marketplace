import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

async function connect() {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({method: "eth_requestAccounts",});
      const account = accounts[0];
      document.getElementById("ad").innerHTML = account;
    } else {
      document.getElementById("ad").innerHTML = "Please install Metamask";
    }
  }
function Wallat(){
    return(
        <>
        <Navbar />
          <form>
            <div className="wal">
            <button type="button" className="btn btn-outline-secondary" onClick={connect}>Connect Wallet
        </button>
              <pre id="ad"></pre>
            </div>
          </form>
          <Footer />
        </>
    );
}
export default Wallat;