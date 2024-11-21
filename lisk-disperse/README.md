# Disperse App for Lisk Tokens

## LISK Hackathon 2024 x KibokoDAO

Disperse app lets you distribute LISK tokens like LSK to multiple addresses using a single transaction on the LISK blockchain.

## Features

- Distribute LISK or any ERC20 token on LISK to multiple addresses in one transaction
- Pay gas fees with ETH or LISK 
- User-friendly interface for inputting recipient addresses and amounts
- Support for various input formats
- Real-time transaction status updates

## Demo

[Demo](https://lisk-disperse.vercel.app)

## Getting Started

### Prerequisites

- Node.js (v14.x or later recommended)
- npm or yarn
- MetaMask or any Web3 wallet with LISK support

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/DennohKim/disperse-LISK-clone.git
   ```

2. Install the dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your configuration:
   ```
   LISK_MAINNET_RPC=https://forno.LISK.org
   PRIVATE_KEY=your_private_key_here
   
   ```

4. Deploy the contract:
   ```
   npx hardhat run scripts/deploy.js --network LISK
   ```

5. Update the `disperseAddress` in `frontend/src/utils/constants.ts` with the newly deployed contract address.

6. Start the frontend development server:
   ```
   cd frontend
   npm run dev
   # or
   yarn dev
   ```

## Usage

1. Connect your Web3 wallet (ensure it's connected to the LISK network).
2. Enter recipient addresses and amounts in the text area.
4. Click "Disperse" to send the transaction.
5. Confirm the transaction in your wallet.
6. Wait for the transaction to be processed and check the status.


## License

This project is licensed under the MIT License.

## Acknowledgements

- Built with [Hardhat](https://hardhat.org/), [React](https://reactjs.org/), and [ethers.js](https://docs.ethers.io/)
- LISK integration powered by [LISK SDK](https://docs.LISK.org/developer/)
