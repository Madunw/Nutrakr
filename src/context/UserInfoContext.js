import { ethers } from 'ethers';
import { userInfoAddress, userInfoABI } from '../../smart_contracts/contract';

// Get the contract instance
export function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const ContractCounter = new ethers.Contract(
    userInfoAddress,
    userInfoABI,
    signer
  );
  return ContractCounter;
}

// Get UserInfoUpdated events and update the list for table data
export async function getUserInfoUpdatedEvents() {
  const filter = getContract().filters.UserInfoUpdated();
  const events = await getContract().queryFilter(filter);
  return events;
}

