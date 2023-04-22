import axios from 'axios';
import { sepolia } from '../model/ChainInfo';


export class TransactionService {

  static API_URL =  'https://deep-index.moralis.io/api/v2';
  static API_KEY =  'qdg41lbaAjWjvEm8b5JU4I7JlyzDT2AvuYclAlhh6YSupkhO1yNTTNkLQZSxxOeP';

  static async getTransactions(address) {
    const options = {
        method: 'GET',
        url: `${TransactionService.API_URL}/${address}`,
        params: {chain: sepolia.chainName.toLowerCase()},
        headers: {accept: 'application/json', 'X-API-Key': TransactionService.API_KEY}
      };

    const response = await axios.request(options);
    return response;
  }

}