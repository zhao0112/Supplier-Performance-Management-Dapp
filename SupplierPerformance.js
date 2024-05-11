import Web3 from 'web3';

const contractAddress = '0xc8d2E2092ACf2886aE48AD09Bb7b45d9574A80f8'; // 将此替换为您的合约地址
const contractABI = [ 
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "supplier",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "BonusAwarded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "acceptedProducts",
				"type": "uint256"
			}
		],
		"name": "OrderAccepted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "supplier",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "createdTime",
				"type": "uint256"
			}
		],
		"name": "OrderCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "deliveredTime",
				"type": "uint256"
			}
		],
		"name": "OrderDelivered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "supplier",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "onTimeOrders",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "acceptedProducts",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalProductCount",
				"type": "uint256"
			}
		],
		"name": "SupplierDataUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "supplier",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "warningCount",
				"type": "uint256"
			}
		],
		"name": "WarningIssued",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "addBonusToPool",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
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
		"inputs": [],
		"name": "bonusPool",
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
				"name": "totalProducts",
				"type": "uint256"
			}
		],
		"name": "createOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			}
		],
		"name": "deliverOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "supplierAddress",
				"type": "address"
			}
		],
		"name": "evaluateSupplierPerformance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "supplierAddress",
				"type": "address"
			}
		],
		"name": "getAcceptedProductRate",
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
				"internalType": "address",
				"name": "supplierAddress",
				"type": "address"
			}
		],
		"name": "getOnTimeDeliveryRate",
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
				"internalType": "address",
				"name": "supplierAddress",
				"type": "address"
			}
		],
		"name": "getSupplierData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalOrders",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "onTimeOrders",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalProducts",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "acceptedProducts",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastEvaluationTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "warningCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "supplierAddress",
				"type": "address"
			}
		],
		"name": "getSupplierWarningCount",
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
		"name": "orderCounter",
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
		"name": "orders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "supplierAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "createdTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deliveredTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "acceptedProducts",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isDelivered",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isAccepted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "suppliers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalOrders",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "onTimeOrders",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalProducts",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "acceptedProducts",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastEvaluationTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "warningCount",
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
				"name": "orderId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "acceptedProducts",
				"type": "uint256"
			}
		],
		"name": "updateSupplierData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
] ; 

let web3;
let contract;

export const init = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      contract = new web3.eth.Contract(contractABI, contractAddress);
    } catch (error) {
      console.error('User denied account access');
    }
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
    contract = new web3.eth.Contract(contractABI, contractAddress);
  } else {
    console.error('No web3 detected');
  }
};

export const createOrder = async (totalProducts) => {
  const accounts = await web3.eth.getAccounts();
  return contract.methods.createOrder(totalProducts).send({ from: accounts[0] });
};

// 为其他函数添加类似的导出