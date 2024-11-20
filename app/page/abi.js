export const ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "n",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "p",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "k",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "temperature",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "humidity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ph",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rainfall",
				"type": "uint256"
			}
		],
		"name": "submitData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getReading",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "n",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "p",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "k",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "temperature",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "humidity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ph",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rainfall",
						"type": "uint256"
					}
				],
				"internalType": "struct SensorData.Reading",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getReadingCount",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "readings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "n",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "p",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "k",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "temperature",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "humidity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ph",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rainfall",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]