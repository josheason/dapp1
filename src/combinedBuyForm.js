/*import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import SimpleLockContract from "./contracts/Lock.json";
import Token from "./contracts/LockToken.json";
import getWeb3 from "./getWeb3";
import Web3 from "web3";
import {LOCKTOKEN_TODO_LIST_ADDRESS, LOCKTOKEN_TODO_LIST_ABI,LOCK_TODO_LIST_ADDRESS,LOCK_TODO_LIST_ABI, myFunction} from './config';
import image from "./eth.png";
import "./App.css";

/*
window.addEventListener('load', function() {
	if (typeof web3 !== 'undefined') {
		console.log('web3 is enabled')
		if (web3.currentProvider.isMetaMask === true) {
			console.log('MetaMask is active')
		} else {
			console.log('MetaMask is not available')
		}
	} else {
		console.log('web3 is not found')
	}
})
*/


/*var lockContract = require('web3-eth-contract');
lockContract.setProvider('ws://localhost:8545');
var lockC = new lockContract(LOCK_TODO_LIST_ABI, LOCK_TODO_LIST_ADDRESS);
var lockTokC = new lockContract(LOCKTOKEN_TODO_LIST_ABI, LOCKTOKEN_TODO_LIST_ADDRESS);
var test = window.web3;*/
//var pubAddress = test.eth.coinbase;
//const lockContract = new Web3.eth.Contract(LOCK_TODO_LIST_ABI, LOCK_TODO_LIST_ADDRESS);
//const lockTokenContract = new Web3.eth.Contract(LOCKTOKEN_TODO_LIST_ABI, LOCKTOKEN_TODO_LIST_ADDRESS);

/*class App extends Component {
	
	constructor(props) {
			super(props);
			this.state = { storageValue: 0, web3: null, accounts: null, contract: null, amount: null, days: null, beneficiary: null, ethBalance: null };
				
				
			this.handleAmount = this.handleAmount.bind(this);
			 this.handleDays = this.handleDays.bind(this);
			 this.handleBen = this.handleBen.bind(this);*/
			//this.handleChange = this.handleChange.bind(this);
			//this.handleSubmit = this.handleSubmit.bind(this);
		}
	//state = { storageValue: 0, web3: null, accounts: null, contract: null, amount: null, daysL: null, beneficiary: null };

/* componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();

			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = SimpleLockContract.networks[networkId];
			const instance = new web3.eth.Contract(LOCK_TODO_LIST_ABI, LOCK_TODO_LIST_ADDRESS);*/
						//Undo below:
			//const instance = new web3.eth.Contract(
			 // SimpleLockContract.abi,
			//  deployedNetwork && deployedNetwork.address,
		 // );

			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			/*this.setState({ web3, accounts, contract: instance }, this.runExample);
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`,
			);
			console.error(error);
		}
	};*/
	
	/*loadBlockchaindata = async () =>{
		const web3 = window.web3
		
		const accounts = await web3.eth.getAccounts()
		this.setState({accounts: accounts[0]})
		
		const ethBalance = await web3.eth.getBalance(this.state.account)
		this.setState({ethBalance})
		
		//Load Token
		const networkId = await web3.eth.net.getId()
		const tokenData = Token.networks[networkId]
		if(tokenData){
			const token = new web3.eth.Contract(Token.abi, tokenData.address)
			this.setState({token})
			let tokenBalance = await token.methods.balanceOf(this.state.account).call()
			this.setState({tokenBalance: tokenBalance.toString()})
		} else{
			window.alert('Token contract not deployed to detected network.')
		}
		
		//Load EthSwap
		const ethSwapData = SimpleLockContract.networks[networkId]
		if(ethSwapData){
			const ethSwap = new web3.eth.Contract(SimpleLockContract.abi, SimpleLockContract.address)
			this.setSTate({ethSwap})
		} else{
			window.alert('EthSwap contract not deployed to detected network.')
		}
		
		this.setState({loading: false})
		
	}*/
	//const owner = '0x1168C9723ECf0EAD7e83C16c2693A9e0C794b9Db'
	//const account1 = '0x6840c255356C8E620D922e0292D40B2D6c8C962D'

	
	/*buyToken = (etherAmount) => {
		this.setState({loading: true})
		this.state.SimpleLockContract.methods.lock(etherAmount, 0x1168C9723ECf0EAD7e83C16c2693A9e0C794b9Db, 1, 1,0x6840c255356C8E620D922e0292D40B2D6c8C962D,1,1 ).send({value: etherAmount, from: this.state.account}).on('transactionHash',(hash) =>{
				this.setState({loading: false})
		})
	}*/
	
	/*loadBlockchainData = async () => {
			const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
			const accounts = await web3.eth.getAccounts()
			this.setState({ account: accounts[0] })
			//LockToken
			const locktokentodoList = new web3.eth.Contract(LOCKTOKEN_TODO_LIST_ABI,LOCKTOKEN_TODO_LIST_ADDRESS)
			this.setState({ locktokentodoList })
			const taskCount = await locktokentodoList.methods.taskCount().call()
			this.setState({ taskCount })
			for (var i = 1; i <= taskCount; i++) {
				const task = await locktokentodoList.methods.tasks(i).call()
				this.setState({
					tasks: [...this.state.tasks, task]
				})
			}
			//Lock
			const locktodoList = new web3.eth.Contract(LOCK_TODO_LIST_ABI,LOCK_TODO_LIST_ADDRESS)
			this.setState({ locktodoList })
			const taskCount1 = await locktodoList.methods.taskCount().call()
			this.setState({ taskCount1})
			for (var i = 1; i <= taskCount1; i++) {
				const task1 = await locktodoList.methods.tasks(i).call()
				this.setState({
					tasks: [...this.state.tasks, task1]
				})
			}

	}*/
	
	
	/*handleAmount(event){
		this.setState({amount: event.target.value});
		console.log(this.state.amount);
	}
	
	handleDays(event){
		this.setState({days: event.target.value});
		console.log(this.state.days);
	}
	
	handleBen(event){
		this.setState({beneficiary: event.target.value});
		console.log(this.state.beneficiary);
	}*/
	
	
	/*handleSubmit(){
		console.log("Submitted!");
		const{accounts, contract, amount, days, beneficiary} = this.state;
		contract.methods.lock(accounts, amount, days, beneficiary, amount, false).send({from: accounts[0]});
		const response = contract.methods.lock().call();
	}*/
	
 /* handleSubmit = async () =>{
		const Web3 = require('web3')
		const rpcURL = "https://rinkeby.infura.io/v3/ea41dc9d05614117bff471a9fd4e7990"
		const web3 = new Web3(rpcURL);
		const account = "0x1168C9723ECf0EAD7e83C16c2693A9e0C794b9Db"
		const contracts = new web3.eth.Contract(LOCK_TODO_LIST_ABI,LOCK_TODO_LIST_ADDRESS);
		const Tokencontract = new web3.eth.Contract(LOCKTOKEN_TODO_LIST_ABI,LOCKTOKEN_TODO_LIST_ADDRESS);
		await Tokencontract.methods.mint(account, 1).send({from: account})
		console.log(web3.eth.getBalance())
		this.setState({amount: web3.eth.getBalance()});
		web3.eth.getCoinbase()
		.then(console.log);
		
	}*/
	
	/*runExample = async () => {
		const Web3 = require('web3')
		const rpcURL = 'https://rinkeby.infura.io/v3/ea41dc9d05614117bff471a9fd4e7990'
		const web3 = new Web3(rpcURL)
		const Tokencontract = new web3.eth.Contract(LOCKTOKEN_TODO_LIST_ABI,LOCKTOKEN_TODO_LIST_ADDRESS);
		const owner = '0x1168C9723ECf0EAD7e83C16c2693A9e0C794b9Db'
		const account1 = '0x6840c255356C8E620D922e0292D40B2D6c8C962D'
		//let result, ammount
		//ammount = web3.utils.toWei('100')
		//await Tokencontract.methods.mint(account1, ammount).call({ from: owner })
		//  console.log(`Minted ${web3.utils.fromWei(ammount, 'ether')} tokens for account #1`)
		
	}*/
	
	
	/*handleSubmit(){
			console.log("Submitted!");
			const{accounts, contract, amount, days, beneficiary} = this.state;
			await contract.methods.lock(accounts, amount, days, beneficiary, amount, false).send({from: accounts});
			const response = await contract.methods.lock().call();
		}*/
	
	
	
//Commented out because of MetaMask requests
	/*runExample = async () => {
		const Web3 = require('web3')
		const rpcURL = "https://rinkeby.infura.io/v3/ea41dc9d05614117bff471a9fd4e7990"
		const web3 = new Web3(rpcURL);
		const Tokencontract = new web3.eth.Contract(LOCKTOKEN_TODO_LIST_ABI,LOCKTOKEN_TODO_LIST_ADDRESS);
		const accountO = "0x1168C9723ECf0EAD7e83C16c2693A9e0C794b9Db"
		const account = "0x6840c255356C8E620D922e0292D40B2D6c8C962D"
		
		const transactionParameters = {
			nonce: '0x00', 
			gasPrice: '0x09184e72a000', 
			gas: '0x55F0', 
			to: account, 
			from: window.ethereum.selectedAddress,
			value: '0x00', 
			data:
				'0x7f7465737432000000000000000000000000000000000000000000000000000000600057', 
			chainId: 4,
		};


		const txHash = await window.ethereum.request({
			method: 'eth_sendTransaction',
			params: [transactionParameters],
		});
		
		
		
		
		
		
		
		const { accounts, contract } = this.state;
		// Stores a given value, 5 by default.
		//await contract.methods.getTokenCount().send({ from: accounts[0] });

		// Get the value from the contract to prove it worked.
		//const response = await contract.methods.getTokenCount().call();

		// Update state with the result.
		//this.setState({ storageValue: response });
	};*/
	
 
	render() {
		if (!this.state.web3) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<div className = "back"><div className="row">
			<div className = "outerB"><div className = "column"><img className = "image" src = {require("./eth.png")}/><h1>Ether</h1></div></div>
			<div className = "column1">
			<form className = "forms"> <label>Amount 
			<input type = "text" value={this.state.amount} onChange={this.handleAmount}/>
			</label></form>
			<form className = "forms"> <label>Days To Lock 
			<input type = "text" value={this.state.days} onChange={this.handleDays}/>
			</label></form>
			<form className = "forms">
			<label>Fees
			 <input type = "radio" name = "choice" value = "yes"/> LOCK
			 <input type = "radio" name = "choice" value = "no"/> ETH
			</label></form>
			<form className = "forms">
			<label>Max. Amount
			 <input type = "checkbox" id = "choice3"/>
				<input type = "text" id = "max"/>
			</label></form>
			
			 <form className = "forms">
						<label>Beneficiary
						 <input type = "checkbox" id = "choice3"/>
							<input type = "text" id = "max" value={this.state.beneficiary} onChange={this.handleBen}/>
						</label>
						<button id = "lockA" className = "button" onClick={this.handleSubmit}>Lock Asset</button></form>
			
			</div>
			</div>
			<div className = "outerB"><div className = "columnL"><h1>FEES</h1><p>OR</p><p>0 LOCK</p></div></div>
			
			<div className = "column12"><h1>Lock Token</h1><p className="stayL">Balance</p><p className="stayR">0</p><hr className="line"/><p className="stayL2">Approval</p><p className="stayR2">0</p>
			 <button id = "lockA" className = "button">Approve Lock</button></div>
			<div className="row">
			</div>
			<div className="headerR">
			<div className="header">
			Locked
			</div>
			<div className="nameC">Name</div>
			<div className="nameA">Amount</div>
			 <div className="nameS">Start Date</div>
			 <div className="nameT">Time Left</div>
			</div>
			</div>
		);
	}
}

export default App;
