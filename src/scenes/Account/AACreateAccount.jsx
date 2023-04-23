import React, { useEffect, useState, useCallback } from 'react';
import { EthAddressGenerator, RecoverAccount } from '../../utils/AccountUtils';
import AccountDetail from './AccountDetail';
import { AAWalletUtils } from '../../utils/AAWalletUtils';

import { ethers } from "ethers";
import { chiado } from '../../model/ChainInfo';
import SimpleAccountFactoryAbi from "../../utils/SimpleAccountFactory.json"
import SimpleAccountAbi from "../../utils/SimpleAccount.json"
import SimpleAccountByteCode from "../../utils/SimpleAccountByteCode.json"

import axios from 'axios';

const recoveryPhraseKeyName = 'recoveryPhrase';

function AACreateAccount() {

  // Declare a new state variable, which we'll call "seedphrase"
  // const [seedphrase, setSeedphrase] = useState('');

  // const [recoverSeedphrase, setRecoverSeedphrase] = useState('');
  const [guardian1, setGuardian1] = useState();
  const [guardian2, setGuardian2] = useState();
  const [guardian3, setGuardian3] = useState();
  const [guardianR, setGuardianR] = useState();

  const [owner, setOwner] = useState();
  const [newOwner, setNewOwner] = useState();

  // Declare a new state variable, which we'll call "account"
  const [aaAccount, setAaAccount] = useState();

  // Declare a new state variable, which we'll call "showRecoverInput"
  // and initialize it to false
  const [aashowRecoverInput, setAaShowRecoverInput] = useState(false);

  function createAccount() {

    if (document.getElementById("owner").value === "") {
      alert("Please Set CA Wallet Owner");
    } else {

      const main = async () => {
        const entryPointAddress = "0x0576a174D229E3cFA37253523E645A78A0C91B57"
        const paymasterAddress = ""
        const factoryAddress = "0x3e4C2dd06433dD5643053825DCFC523A5783B30c"

        const provider = new ethers.providers.JsonRpcProvider(chiado.rpcUrl);
        // signer = await provider.getSigner()
        const privateKey = "108aff6d1a3f82f9c573fda61573279ffad9ea05daff386847c93532c7ed3515";

        const signer = new ethers.Wallet(privateKey, provider);

        const salt = 6;

        //SimpleAccountFactory
        const contract = new ethers.Contract(factoryAddress, SimpleAccountFactoryAbi, signer);
        const createAccount = await contract.createAccount(document.getElementById("owner").value, salt);

        const getAddress = await contract.getAddress(document.getElementById("owner").value, salt);

        setAaAccount(getAddress);

        // const accountOwner = await accountContract.owner();
        // setOwner(accountOwner);
      }

      main();

    }
  }

  function handleChange(event) {
    // Update the seedphrase state with the value from the text input
    // setSeedphrase(event.target.value);
    // setRecoverSeedphrase(event.target.value);
  }

  const handleKeyDown = async (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      recoverAccount(seedphrase);
    }
  }

  function recoverAccount() {
    if (document.getElementById("newOwner").value === "") {
      alert("Please Set New Owner Address");
    } else if (document.getElementById("aaAccount").value === "") {
      alert("Please Set Recover CA Wallet Account Address");
    } else {

      const caaccount = document.getElementById("aaAccount").value;

      const main = async () => {
        const provider = new ethers.providers.JsonRpcProvider(chiado.rpcUrl);
        // signer = await provider.getSigner()
        const privateKey = "108aff6d1a3f82f9c573fda61573279ffad9ea05daff386847c93532c7ed3515";

        const signer = new ethers.Wallet(privateKey, provider);

        const accountContract = new ethers.Contract(caaccount, SimpleAccountAbi, signer);

        await accountContract.voteProposal(document.getElementById("newOwner").value, {gasLimit:5000000});

        const accountOwner = await accountContract.owner();
        setOwner(accountOwner);
      }

      main();
    }
  }

  function setGuardians() {
    if (document.getElementById("guardian1").value === "") {
      alert("Please Set Guardian 1 Address");
    } else if (document.getElementById("guardian2").value === "") {
      alert("Please Set Guardian 2 Address");
    } else if (document.getElementById("guardian3").value === "") {
      alert("Please Set Guardian 3 Address");
    } else {

      const main = async () => {

        const provider = new ethers.providers.JsonRpcProvider(chiado.rpcUrl);
        // signer = await provider.getSigner()
        const privateKey = "108aff6d1a3f82f9c573fda61573279ffad9ea05daff386847c93532c7ed3515";

        const signer = new ethers.Wallet(privateKey, provider);

        const caaccount = document.getElementById("aaAccount").value;

        const accountContract = new ethers.Contract(caaccount, SimpleAccountAbi, signer);

        await accountContract.addGuardian(document.getElementById("guardian1").value, {gasLimit:5000000});
        await accountContract.addGuardian(document.getElementById("guardian2").value, {gasLimit:5000000});
        await accountContract.addGuardian(document.getElementById("guardian3").value, {gasLimit:5000000});
      }

      main();
    }

  }

  function getOwner() {
    const main = async () => {
      const provider = new ethers.providers.JsonRpcProvider(chiado.rpcUrl);
      // signer = await provider.getSigner()
      const privateKey = "108aff6d1a3f82f9c573fda61573279ffad9ea05daff386847c93532c7ed3515";

      const signer = new ethers.Wallet(privateKey, provider);

      const caaccount = document.getElementById("aaAccount").value;

      const accountContract = new ethers.Contract(caaccount, SimpleAccountAbi, signer);
      const accountOwner = await accountContract.owner();

      setOwner(accountOwner);
    }

    main();
  }



  // recoverAccount could be used without recoveryPhrase as an arguement but then we would have to
  // put it in a deps array.
  // async (recoveryPhrase) => {

  //   // Call the RecoverAccount function with no arguments
  //   // Call the RecoverAccount function and pass it 0 and the current seedphrase
  //   const result = await RecoverAccount(recoveryPhrase);

  //   // Update the account state with the newly recovered account
  //   setAccount(result.account);

  //   if (localStorage.getItem(recoveryPhraseKeyName) !== recoveryPhrase) {
  //     localStorage.setItem(recoveryPhraseKeyName, recoveryPhrase);
  //   }

  // }, []

  /*
  useEffect(() => {
    // setTt();
    AAWalletUtils("0xB5Cc21fc0c111945601F4707369b0B983920f81C").then( function (res) {
      console.log("AACreateAccount print AAWalletUtils::",res);
      setTt(res);
    });
    // const localStorageRecoveryPhrase = localStorage.getItem(recoveryPhraseKeyName)
    // if (localStorageRecoveryPhrase) {
    //   setSeedphrase(localStorageRecoveryPhrase);
    //   recoverAccount(localStorageRecoveryPhrase);
    // }
  }, [])
  */

  function myinput(text) {
    if (text === "1") {
      setGuardian1(document.getElementById("guardian1").value);
    } else if (text === "2") {
      setGuardian2(document.getElementById("guardian2").value);
    } else if (text === "3") {
      setGuardian3(document.getElementById("guardian3").value);
    } else if (text === "A") {
      setAaAccount(document.getElementById("aaAccount").value);
    } else if (text === "N") {
      setNewOwner(document.getElementById("newOwner").value);
    } else if (text === "O") {
      setOwner(document.getElementById("owner").value);
    }
  }

  return (
    <div>
      <p>Please Set CA Wallet Owner</p>
      <p>CA Wallet Owner : <input type="text" id="owner" value={owner} oninput="myinput('O')" /></p>
      {/* <form onSubmit={event => event.preventDefault()}> */}
      <button type="button" className="btn btn-primary" onClick={createAccount}>
        Create Account
      </button>

      <p>Address : {aaAccount === null ? "" : <a href={`https://blockscout.com/gnosis/chiado/address/${aaAccount}`} target="_blank" rel="noreferrer">{aaAccount}</a>}</p>

      <button type="button" className="btn btn-primary" onClick={getOwner}>Get Owner</button>
      <p>Owner : {owner === null ? "" : owner}</p>

      <p>Please Set Guardians</p>
      <p>Guardian 1 Address : <input type="text" id="guardian1" value={guardian1} oninput="myinput('1')" /></p>
      <p>Guardian 2 Address : <input type="text" id="guardian2" value={guardian2} oninput="myinput('2')" /></p>
      <p>Guardian 3 Address : <input type="text" id="guardian3" value={guardian3} oninput="myinput('3')" /></p>

      <button type="button" className="btn btn-primary" onClick={setGuardians}>
        Set Guardians
      </button>

      <hr />

      <p> Action Recover Account </p>

      <p> Recover CA Wallet Account Address : <input type="text" id="aaAccount" value={aaAccount} oninput="myinput('A')" /></p>
      <p> New Owner Address : <input type="text" id="newOwner" value={newOwner} oninput="myinput('N')" /></p>

      <button type="button" className="btn btn-outline-primary ml-3"
        onClick={recoverAccount}
      // onClick={() => aashowRecoverInput ? recoverAccount(seedphrase) : setAaShowRecoverInput(true)}
      // if the recoveryinput is showing but there is no seedphrase, disable the ability to recover account
      // disabled={aashowRecoverInput && !seedphrase}
      >
        Recover Account
      </button>

    </div>
  );
}

export default AACreateAccount;
