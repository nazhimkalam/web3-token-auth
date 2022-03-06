import React from "react";
import { ethers } from "ethers";
import Web3Token from "web3-token";
import axios from "axios"

const App = () => {
  const handleConnection = async () => {
    // connect the current page to the meta mask provider
    const token = await generateToken();
    console.log("Token from the client: ", token);

    const response = await axios.post("http://localhost:5000/", { name: "John Doe" }, { headers: { Authorization: `Bearer ${token}` } } );
    console.log(response);
  };


  const generateToken = async () => {
    if (!window.ethereum) {
      return console.log('Please install and activate the metamask extension!');
    }
  
    const provider =  new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  
    try {
      return await Web3Token.sign(async msg => {
        try {
          return await signer.signMessage(msg);
        }
        catch (err) {
          const { reason } = err;
          if (reason === "unknown account #0") {
            return console.log('Have you unlocked metamask and are connected to this page?')
          }
  
          console.log(err.toString());
        }
      }, '1d');
    }
    catch (err) {
      if (/returns a signature/.test(err.toString())) {
        return;
      }
      console.log(err.toString());
    }
  }

  return (
    <div>
      <button onClick={handleConnection}>Connect to metamask</button>
    </div>
  );
};

export default App;
