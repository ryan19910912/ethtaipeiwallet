
// import * as entryPointAbi from "./IEntryPoint";
// import * as factoryAbi from "./StealthWalletFactory";

// import * as userOpHelperAbi from "./StealthWalletUserOpHelper";

// import * as yoruAbi from "./Yoru";
import SimpleAccountFactoryAbi from "./SimpleAccountFactory.json"
import SimpleAccountAbi from "./SimpleAccount.json"
import SimpleAccountByteCode from "./SimpleAccountByteCode.json"
import MintAbi from "./721Mint.json"
import { ethers } from "ethers";
import { chiado } from '../model/ChainInfo';

const hdca_map = new Map();

export async function AAWalletUtils(ownerAddress) {

    const entryPointAddress = "0x0576a174D229E3cFA37253523E645A78A0C91B57"
    // const paymasterAddress = ""
    const factoryAddress = "0xEeab5D2E8c5299923D20E5a40bD1D57b79c8D3a7"
    // const account0Address = "0x6C31F131bb470AF8006D10F1AC89A39c5aD9277F"
    // const userOpHelperAddress = ""
    // const tryEmitAddress = "0xcF33077D08ADc94a858c7E19EcF77548fC45292e"

    const provider = new ethers.JsonRpcProvider(chiado.rpcUrl);
    // signer = await provider.getSigner()


    //SimpleAccountFactory
    const contract = new ethers.Contract(factoryAddress, SimpleAccountFactoryAbi, provider);
    const accountImplementation = await contract.accountImplementation();
    // const createAccount = await contract.createAccount(ownerAddress, 5);
    const getAddress = await contract.getAddress(ownerAddress,5);
    // const ethersSigner = provider.getSigner();
    // const prefundAccountAddress = await ethersSigner.getAddress();
    // const prefundAccountBalance = await provider.getBalance(prefundAccountAddress);
    const returnMessage = accountImplementation.toString();
    console.log("accountImplementation::", returnMessage);
    // console.log("createAccount::", createAccount);
    console.log("getAddress::",getAddress);

    //SimpleAccount
    const account0 = new ethers.Contract(account0Address, SimpleAccountAbi, provider);
    const account0_entryPoint = await account0.entryPoint();
    const account0_owner = await account0.owner();
    console.log("account0_entryPoint::",account0_entryPoint);
    console.log("account0_owner::",account0_owner);

    //try emit
    const mintContract = new ethers.Contract(tryEmitAddress, MintAbi, provider);
    mintContract.on("MintInfo", ( sender, owner, mintNumber, event)=>{
        
        console.log(sender, owner, mintNumber);
        if(mintNumber==="0x7ae5b565b6bd62cb8f307d1daf2b64657446d3ca29b31febcee1bc87dfcd4c37"){
            console.log("right right right");
        }
        event.removeListener();
    })
    // const wallet = new ethers.Wallet("0x6174c9a712f37ab03ed796fe2b56606a39e19d97de45eca731acb4e4db206962", provider)
    // const entryPoint = new ethers.Contract(entryPointAddress, entryPointAbi, wallet)
    // const factory = new ethers.Contract(factoryAddress, factoryAbi, wallet)
    // const yoru = new ethers.Contract(yoruAddress, yoruAbi, wallet)
    // const userOpHelper = new ethers.Contract(userOpHelperAddress, userOpHelperAbi, wallet)

    // const feeData = await provider.getFeeData()
    // console.log(feeData)

    // Sender send
    // const walletOwner = wallet.address
    // const r = ethers.utils.hexlify(ethers.utils.randomBytes(32))
    // const salt = ethers.utils.keccak256(r)
    // const stealthWalletAddress = await factory.getAddress(walletOwner, salt)
    // console.log(
    //     `Owner: ${walletOwner}, r: ${r} and salt: ${salt} -> stealth wallet address: ${stealthWalletAddress}`,
    // )
    // const returnMessage = 'using prefund account address'+prefundAccountAddress+'with balance'+prefundAccountBalance.toString();

 
    return returnMessage;
}


