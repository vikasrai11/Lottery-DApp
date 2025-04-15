import React, { useEffect, useState } from 'react';
import { BrowserProvider, Contract, parseEther, formatEther } from 'ethers';
import './App.css';



const CONTRACT_ADDRESS = '0x5fc8d32690cc91d4c39d9d3abcbd16989f875707';

const LOTTERY_ABI = [
	{
		"inputs": [],
		"name": "enterLottery",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_entryFee",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "pickWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "entryFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPlayers",
		"outputs": [
			{
				"internalType": "address payable[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "players",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [lotteryId, setLotteryId] = useState(null);
  const [lotteryEntries, setLotteryEntries] = useState([]);
  const [winner, setWinner] = useState('');
  const [entryAmount, setEntryAmount] = useState('0.01');

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const browserProvider = new BrowserProvider(window.ethereum);
          const signer = await browserProvider.getSigner();
          const lotteryContract = new Contract(CONTRACT_ADDRESS, LOTTERY_ABI, signer);

          setProvider(browserProvider);
          setSigner(signer);
          setContract(lotteryContract);
        } catch (err) {
          console.error('Error setting up provider:', err);
        }
      } else {
        alert('Please install MetaMask');
      }
    };

    init();
  }, []);

  const enterLottery = async () => {
    try {
      const tx = await contract.enterLottery({ value: parseEther(entryAmount) });
      await tx.wait();
      alert('Entered the lottery successfully!');
    } catch (err) {
      console.error('Error entering lottery:', err);
    }
  };

  const fetchLotteryDetails = async () => {
    try {
      const id = await contract.lotteryId();
      const entries = await contract.getEntries(id);
      setLotteryId(id.toString());
      setLotteryEntries(entries);
    } catch (err) {
      console.error('Error fetching details:', err);
    }
  };

  const drawWinner = async () => {
    if (!contract) return;
  
    try {
      const tx = await contract.pickWinner(); // Call pickWinner() from frontend
      await tx.wait();
  
      const winner = await contract.winner(); // Then read stored winner
      alert(`Winner is: ${winner}`);
    } catch (err) {
      console.error("Error drawing winner:", err);
      alert("There was an error drawing the winner.");
    }
  };
  

  return (
    <div className="App">
      <h1>🎲 Decentralized Lottery System</h1>

      <input
        type="text"
        value={entryAmount}
        onChange={(e) => setEntryAmount(e.target.value)}
        placeholder="Entry amount in ETH"
      />
      <button onClick={enterLottery}>Enter Lottery</button>

      <hr />

      

      

      <button onClick={drawWinner}>Pick Winner</button>
      {winner && (
        <div>
          <h2>🎉 Winner: {winner}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
