export default [
	{
		"constant": true,
		"inputs": [
			{
				"name": "board",
				"type": "uint256"
			},
			{
				"name": "winLine",
				"type": "uint256"
			},
			{
				"name": "start",
				"type": "uint256"
			}
		],
		"name": "checkWin",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "games",
		"outputs": [
			{
				"name": "boardX",
				"type": "uint256"
			},
			{
				"name": "boardO",
				"type": "uint256"
			},
			{
				"name": "playerX",
				"type": "address"
			},
			{
				"name": "playerO",
				"type": "address"
			},
			{
				"name": "result",
				"type": "uint256"
			},
			{
				"name": "moveOf",
				"type": "address"
			},
			{
				"name": "lastMove",
				"type": "uint256"
			},
			{
				"name": "movedAtBlock",
				"type": "uint256"
			},
			{
				"name": "requestDraw",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "claimFinishGame",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "size",
				"type": "uint256"
			},
			{
				"name": "betAmount",
				"type": "uint256"
			},
			{
				"name": "min",
				"type": "uint256"
			},
			{
				"name": "fee",
				"type": "uint256"
			}
		],
		"name": "setting",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "waitingGames",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "player",
				"type": "address"
			}
		],
		"name": "gameOf",
		"outputs": [
			{
				"name": "index",
				"type": "uint256"
			},
			{
				"name": "playerX",
				"type": "address"
			},
			{
				"name": "playerO",
				"type": "address"
			},
			{
				"name": "boardX",
				"type": "uint256"
			},
			{
				"name": "boardO",
				"type": "uint256"
			},
			{
				"name": "moveOf",
				"type": "address"
			},
			{
				"name": "movedAtBlock",
				"type": "uint256"
			},
			{
				"name": "lastMove",
				"type": "uint256"
			},
			{
				"name": "result",
				"type": "uint256"
			},
			{
				"name": "requestDraw",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "requestDrawGame",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "playerAlias",
				"type": "address"
			},
			{
				"name": "withPlayer",
				"type": "address"
			},
			{
				"name": "roomIndex",
				"type": "uint256"
			}
		],
		"name": "joinGame",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "quitGame",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "aliasPlayer",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "players",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "place",
				"type": "uint256"
			},
			{
				"name": "winLine",
				"type": "uint256"
			},
			{
				"name": "start",
				"type": "uint256"
			}
		],
		"name": "move",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "place",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "boardX",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "boardO",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "result",
				"type": "uint256"
			}
		],
		"name": "Move",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "gameId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "player",
				"type": "address"
			}
		],
		"name": "Winner",
		"type": "event"
	}
]