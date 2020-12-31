import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import Web3 from "web3";
import {LOCKTOKEN_TODO_LIST_ADDRESS, LOCKTOKEN_TODO_LIST_ABI,LOCK_TODO_LIST_ADDRESS,LOCK_TODO_LIST_ABI} from './config';

import "./App.css";

class App extends Component {
	state = { storageValue: 0, web3: null, accounts: null, contract: null };

	componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();

			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = SimpleStorageContract.networks[networkId];
			const instance = new web3.eth.Contract(
				SimpleStorageContract.abi,
				deployedNetwork && deployedNetwork.address,
			);

			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState({ web3, accounts, contract: instance }, this.runExample);
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`,
			);
			console.error(error);
		}
	};
	
	loadBlockchainData = async () => {
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

	}

	runExample = async () => {
		const { accounts, contract } = this.state;

		// Stores a given value, 5 by default.
		await contract.methods.set(2).send({ from: accounts[0] });

		// Get the value from the contract to prove it worked.
		const response = await contract.methods.get().call();

		// Update state with the result.
		this.setState({ storageValue: response });
	};

	render() {
		if (!this.state.web3) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<div className="App">
				<h1>Ethereum Exchange Page</h1>
				<p>Your Truffle Box is installed and ready.</p>
				<h2>Smart Contract Example</h2>
				<p>
					If your contracts compiled and migrated successfully, below will show
					a stored value of 5 (by default).
				</p>
				<p>
					Try changing the value stored on <strong>line 40</strong> of App.js.
				</p>
				<div>The stored value is: {this.state.storageValue}</div>
			</div>
		);
	}
}

export default App;
