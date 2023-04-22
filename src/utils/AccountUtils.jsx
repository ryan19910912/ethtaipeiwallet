import React, { useState } from "react";
import { Wallet } from "ethers";

export function EthAddressGenerator() {
//   const [seedPhrase, setSeedPhrase] = useState("");
//   const [privateKey, setPrivateKey] = useState("");
//   const [publicKey, setPublicKey] = useState("");
//   const [address, setAddress] = useState("");

//   const generateAddress = () => {
    // Generate a new random wallet
    const wallet = Wallet.createRandom();
    
    // Set the values in the state
    // setSeedPhrase(wallet.mnemonic.phrase);
    // setPrivateKey(wallet.privateKey);
    // setPublicKey(wallet.publicKey);
    // setAddress(wallet.address);
//   };
    const account = {"address": wallet.address, "privateKey": wallet.privateKey}
    const seedPhrase = wallet.mnemonic.phrase;
    console.log("return account: ", account)
    console.log("seedPhrase: ", seedPhrase)
    return {account, seedPhrase};

//   return (
//     <div>
//       <button onClick={generateAddress}>Generate Address</button>
//       <p>Seed Phrase: {seedPhrase}</p>
//       <p>Private Key: {privateKey}</p>
//       <p>Public Key: {publicKey}</p>
//       <p>Address: {address}</p>
//     </div>
//   );
}

export async function RecoverAccount(seedPhrase, index) {
    const wallet = (seedPhrase.includes(" ")) ? Wallet.fromPhrase(seedPhrase, `m/44'/60'/0'/0/${index}`) : new Wallet(seedPhrase);
    const account = {"address": wallet.address, "privateKey": wallet.privateKey}
    console.log("return account: ", account)
    return {account, seedPhrase};
}

export function shortenAddress(str, numChars = 4) {
    return `${str.substring(0, numChars)}...${str.substring(str.length - numChars)}`;
}
  
export function toFixedIfNecessary( value, decimalPlaces = 2 ){
    return +parseFloat(value).toFixed( decimalPlaces );
}