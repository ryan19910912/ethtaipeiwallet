
  
export const sepolia = {
    chainId: '11155111',
    chainName: 'Sepolia',
    blockExplorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: 'https://sepolia.infura.io/v3/9e9b02c3918649a38d8c2ca7808df262',
};

export const mainnet = {
    chainId: '1',
    chainName: 'Ethereum',
    blockExplorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://mainnet.infura.io/v3/9e9b02c3918649a38d8c2ca7808df262',
};

export const chiado = {
    chainId: '10200',
    chainName: 'Chiado',
    blockExplorerUrl: 'https://gnosisscan.io/',
    rpcUrl: 'https://rpc.chiado.gnosis.gateway.fm/M6C21JD7XGQFF8CDWR8TVT4RBTTTGVJEZW',
};

export const CHAINS_CONFIG = {
    [sepolia.chainId]: sepolia,
    [mainnet.chainId]: mainnet,
};