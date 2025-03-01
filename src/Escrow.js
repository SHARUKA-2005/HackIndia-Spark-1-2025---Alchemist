import { ethers } from "ethers";

const contractAddress = "0xe5b8a5168c725da0f24bbcc47819aad5edb0d635"; // Replace with your deployed contract address
const contractABI = [
  {
    "inputs": [{"internalType": "address","name": "_usdt","type": "address"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {"internalType": "address","name": "_freelancer","type": "address"},
      {"internalType": "uint256","name": "_amount","type": "uint256"}
    ],
    "name": "createEscrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_escrowId","type": "uint256"}],
    "name": "releaseEscrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const getEthereumContract = async () => {
  if (!window.ethereum) {
    alert("MetaMask is not installed! Please install it to continue.");
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
  } catch (error) {
    console.error("Error connecting to contract:", error);
    alert("Error connecting to smart contract. Check console for details.");
    return null;
  }
};

export const createEscrow = async (freelancer, amount) => {
  const contract = await getEthereumContract();
  if (!contract) return;

  try {
    const transaction = await contract.createEscrow(freelancer, amount);
    await transaction.wait();
    alert("Escrow Created Successfully ✅");
  } catch (error) {
    console.error("Error creating escrow:", error);
    alert("Transaction failed. Check console for details.");
  }
};

export const releaseEscrow = async (escrowId) => {
  const contract = await getEthereumContract();
  if (!contract) return;

  try {
    const transaction = await contract.releaseEscrow(escrowId);
    await transaction.wait();
    alert("Escrow Released Successfully ✅");
  } catch (error) {
    console.error("Error releasing escrow:", error);
    alert("Transaction failed. Check console for details.");
  }
};
