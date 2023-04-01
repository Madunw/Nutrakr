const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "weight",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "calorieNeed",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "int256",
				"name": "goalWeight",
				"type": "int256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "UserInfoUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getUserInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			},
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
				"name": "_weight",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_calorieNeed",
				"type": "uint256"
			},
			{
				"internalType": "int256",
				"name": "_goalWeight",
				"type": "int256"
			}
		],
		"name": "setUserInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const contractAddress = "0xf81b5f871dd1656a27f87700B222E68b60a92729"

export {contractABI, contractAddress}