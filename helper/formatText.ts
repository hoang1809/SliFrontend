import Web3 from 'web3';

export const formatAddress = (address: string): string => {
  if (Web3.utils.isAddress(address)) {
    return `${address.slice(0, 5)}...${address.slice(-3)}`;
  }
  return address;
};
