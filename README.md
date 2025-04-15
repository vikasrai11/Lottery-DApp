# 🎲 Decentralized Lottery DApp

![Solidity](https://img.shields.io/badge/Solidity-^0.8.19-brightgreen)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Foundry](https://img.shields.io/badge/Blockchain-Foundry-purple)
![MetaMask](https://img.shields.io/badge/Web3-MetaMask-orange)

> A fully functional decentralized lottery system where anyone can participate, and only the owner can draw a winner randomly using Ethereum's blockchain. Built with **Solidity**, **Foundry**, **React.js**, and **Ethers.js**.

---

## 🛠️ Tech Stack

| Layer             | Tech                         |
|-------------------|------------------------------|
| 💻 Frontend       | React.js, Ethers.js          |
| ⚙️ Smart Contract | Solidity (0.8.19)            |
| ⚡ Blockchain     | Foundry + Anvil              |
| 🔐 Wallet         | MetaMask                     |

---


### 🧑 enterLottery: Join the lottery by sending ETH
### 👑 pickWinner: Randomly selects a winner (only owner)
### 👥 getPlayers: Returns current participants
### 💰 getBalance: Shows total ETH in contract

# ⚙️ Deployment
## 1. Start Anvil
```bash
anvil
```
## 2. Open Remix IDE
```bash
Connect Remix to Anvil
Change the Environment to Custom - External Http Provider.
http://127.0.0.1:8545
```
## 3. Deploy the Contract
```bash
Copy-paste the lottery.sol contract in Remix.
Compile it using the Solidity compiler.
Deploy with an entry fee (1 ETH).
```
## 4. 🦊 Connect MetaMask to Anvil
```bash
Open MetaMask and import an Anvil account.
```
## 5. Update Frontend with Contract Address
```bash
const LOTTERY_ADDRESS = "your_new_contract_address_here";
```
## 6. 🎮 Use Multiple Accounts to Enter Lottery
```bash
Import multiple Anvil accounts into MetaMask using their private keys.
Switch between MetaMask accounts to call Enter Lottery.
After multiple entries, use the owner account to call Pick Winner.
```
## ✅ Done!
You can now see the winner chosen and the contract balance transferred accordingly.

![Video Demo](https://github.com/vikasrai11/Lottery-DApp/blob/main/lottery.mp4)
