import { ethers, Wallet } from 'ethers';
import { CHAINS_CONFIG, sepolia } from '../model/ChainInfo';

export async function sendToken(
  amount,
  from,
  to,
  privateKey,
) {

  const chain = CHAINS_CONFIG[sepolia.chainId];

  // Create a provider using the Infura RPC URL for sepolia
  const provider = new ethers.JsonRpcProvider(chain.rpcUrl);

  // Create a wallet instance from the sender's private key
  const wallet = new Wallet(privateKey, provider);

  // Construct the transaction object
  const tx = {
    to,
    value: ethers.parseEther(amount.toString()),
  };

  // Sign the transaction with the sender's wallet
  const transaction = await wallet.sendTransaction(tx);

  // Wait for the transaction to be mined
  const receipt = await transaction.wait();

  return {transaction, receipt};
}