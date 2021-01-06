import React, { Component } from 'react'
import Web3 from 'web3'
import Token from './contracts/LockToken.json'
import EthSwap from './contracts/Lock.json'
import Navbar from './Navbar'
import Main from './MainDAIC'
import LogoBar from './LogoBar1'
import './App.css'

const BigNumber = require('bignumber.js');

class AppWorksDAIC extends Component {

	async componentWillMount() {
		await this.loadWeb3()
		await this.loadBlockchainData()
		//await this.getAssets()
		//window.alert(this.state.id)
	}
	


	async loadBlockchainData() {
		const web3 = window.web3

		const accounts = await web3.eth.getAccounts()
		this.setState({ account: accounts[0] })

		const ethBalance = await web3.eth.getBalance(this.state.account)
		this.setState({ ethBalance })
		

		// Load Token = LockToken
		const networkId =  await web3.eth.net.getId()
		const tokenData = Token.networks[networkId]
		if(tokenData) {
			const token = new web3.eth.Contract(Token.abi, tokenData.address)
			this.setState({ token })
			let tokenBalance = await token.methods.balanceOf(this.state.account).call()
			this.setState({ tokenBalance: tokenBalance.toString() })
		} else {
			window.alert('Token contract not deployed to detected network.T')
		}

		// Load EthSwap = Lock
		const ethSwapData = EthSwap.networks[networkId]
		//const ethSwapData = LOCK_TODO_LIST_ABI.networks[networkId]
		if(ethSwapData) {
			const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
			this.setState({ ethSwap })
			let id = await ethSwap.methods.getAssetIds(this.state.account).call()
			this.setState({id: id.toString()})      
			
		} else {
			window.alert('EthSwap contract not deployed to detected network.A')
		}
		
		this.setState({ loading: false })
	}

	async loadWeb3() {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum)
			await window.ethereum.enable()
		}
		else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider)
		}
		else {
			window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
		}
	}
	
	


	buyTokens = (etherAmount, addressT, dur,durH,durM) => {
		let minABI =[
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "Approval",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "Transfer",
				"type": "event"
			},
			{
				"constant": true,
				"inputs": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "spender",
						"type": "address"
					}
				],
				"name": "allowance",
				"outputs": [
					{
						"internalType": "uint256",
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
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "approve",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					}
				],
				"name": "balanceOf",
				"outputs": [
					{
						"internalType": "uint256",
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
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "subtractedValue",
						"type": "uint256"
					}
				],
				"name": "decreaseAllowance",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "addedValue",
						"type": "uint256"
					}
				],
				"name": "increaseAllowance",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "totalSupply",
				"outputs": [
					{
						"internalType": "uint256",
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
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "transfer",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "transferFrom",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			}
		]
		dur = dur * 86400 + durH * 3600 + durM * 60
		//const daiC = new window.web3.eth.Contract(minABI, "0xc3dbf84Abb494ce5199D5d4D815b10EC29529ff8")
		this.setState({loading: true})
		this.state.ethSwap.methods.lock('0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea', etherAmount, dur, addressT, 0, false).send({ from: this.state.account }).on('transactionHash', (hash) => {
				this.setState({ loading: false })
			 })
	}
	//0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
	//0x1168C9723ECf0EAD7e83C16c2693A9e0C794b9Db
	//0xA6c3b49D74d3566724D066E324CFa9f949f1fB6B
	
	
	approveTokens = (etherAmount12) => {
		let minABI =[
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "Approval",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "Transfer",
				"type": "event"
			},
			{
				"constant": true,
				"inputs": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "spender",
						"type": "address"
					}
				],
				"name": "allowance",
				"outputs": [
					{
						"internalType": "uint256",
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
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "approve",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					}
				],
				"name": "balanceOf",
				"outputs": [
					{
						"internalType": "uint256",
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
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "subtractedValue",
						"type": "uint256"
					}
				],
				"name": "decreaseAllowance",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "addedValue",
						"type": "uint256"
					}
				],
				"name": "increaseAllowance",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "totalSupply",
				"outputs": [
					{
						"internalType": "uint256",
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
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "transfer",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "transferFrom",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			}
		]

		this.setState({loading: true})
		const daiC = new window.web3.eth.Contract(minABI, "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea")
		const print1 = daiC.methods.allowance(this.state.account,"0xB4Dcb13f98D486B590E48113A512c97B75402FC5").call({from: this.state.account})
		console.log(print1)
		console.log(print1)
		daiC.methods.approve("0xB4Dcb13f98D486B590E48113A512c97B75402FC5", etherAmount12).send({from: this.state.account}).on('transactionHash', (hash) => {
		/*daiC.methods.increaseAllowance("0xB4Dcb13f98D486B590E48113A512c97B75402FC5", window.web3.utils.toWei("7")).send({from: this.state.account}).on('transactionHash', (hash) => {
				this.setState({loading: false})
		})*/
		this.setState({loading: true})
		})
		/*this.state.ethSwap.methods.updateToken('0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea', window.web3.utils.toWei("0.2"), false, [window.web3.utils.toWei("0"),window.web3.utils.toWei("5"),window.web3.utils.toWei("50"),window.web3.utils.toWei("100"),window.web3.utils.toWei("25000")],[30,40,60,80,100]).send({from: this.state.account }).on('transactionHash', (hash) => {
						this.setState({ loading: false })
					   })*/
	}
	
	//Test net dai: 0xc3dbf84Abb494ce5199D5d4D815b10EC29529ff8
	//Other dai from faucet: 0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea
	//0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
	//0x1168C9723ECf0EAD7e83C16c2693A9e0C794b9Db
	//0xA6c3b49D74d3566724D066E324CFa9f949f1fB6B

	
	
	
	
	 claimTokens = (etherAmount1) => {
			this.setState({ loading: true })
			
			this.state.ethSwap.methods.claim(etherAmount1).send({ from: this.state.account }).on('transactionHash', (hash) => {
					this.setState({ loading: false })
				 })
				//this.state.ethSwap.methods.claim(etherAmount1).call({from: this.state.account})
				this.setState({loading: false})
			
			
		}
		
		checkLocked = () => {
			this.setState({loading: true})
			 /*var id = this.state.ethSwap.methods.getAssetIds(this.state.account).send({ from: this.state.account }).on('transactionHash', (hash) => {
			this.setState({loading: false})
			//window.alert(this.state.checkID)
			var test = new Promise(resolve => {
					setTimeout(() => {
						 this.setState({id})
						 window.alert(this.state.id)
					}, 30000);
				});
				})*/
				this.setState({loading: false})
				//var id = this.state.ethSwap.methods.getAssetIds(this.state.account).call()
			}
			


	constructor(props) {
		super(props)
		this.state = {
			account: '',
			token: {},
			ethSwap: {},
			ethBalance: '0',
			tokenBalance: '0',
			loading: true,
			id: ["0","1","2","3","4","5","6","7","8","9"],
			claim: '0',
		}
	}

	render() {
		let content
		if(this.state.loading) {
			content = <p id="loader" className="text-center">Loading...</p>
		} else {
			content = <Main
				ethBalance={this.state.ethBalance}
				tokenBalance={this.state.tokenBalance}
				buyTokens={this.buyTokens}
				sellTokens={this.sellTokens}
				checkLocked={this.checkLocked}
				claimTokens={this.claimTokens}
				approveTokens={this.approveTokens}
			/>
		}

		return (
			<div>
				<LogoBar account={this.state.account} />
				<div className="backColor">
				<div className ="homeScreen1">
						<main role="main" className="col-lg-12 ml-auto mr-auto">
								{content}
						</main>
					</div>
					</div>
			</div>

		);
	}
}

export default AppWorksDAIC;