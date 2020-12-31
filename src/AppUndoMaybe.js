import React, { Component } from 'react'
import Web3 from 'web3'
import Token from './contracts/LockToken.json'
import Lock from './contracts/Lock.json' //was EthSwap
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

class App extends Component {
	
		constructor(props) {
			super(props)
			this.state = {
				account: '',
				token: {},
				lock: {},
				ethBalance: '0',
				tokenBalance: '0',
				loading: true,
				days: null,
				amount: null,
				contract: null,
			}
			
			this.handleAmount = this.handleAmount.bind(this);
			this.handleDays = this.handleDays.bind(this);
			this.handleBen = this.handleBen.bind(this);

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
				const lockSwapData = Lock.networks[networkId]
				//const ethSwapData = LOCK_TODO_LIST_ABI.networks[networkId]
				if(lockSwapData) {
					const lockC = new web3.eth.Contract(Lock.abi, lockSwapData.address)
					this.setState({ lockC })
				} else {
					window.alert('EthSwap contract not deployed to detected network.A')
				}

				this.setState({ loading: false })
			}
			
			async componentWillMount() {
				await this.loadWeb3()
				await this.loadBlockchainData()
			}
			
			
				handleAmount(event){
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
				}
				
				async handleSubmit(){
					this.setState({ loading: true })
						console.log("Submitted!");
						const{account, contract, amount, days, beneficiary} = this.state;
						await this.state.lockC.methods.lock(account, amount, days, beneficiary, amount, false).call().on('transactionHash', (hash) => {
							this.setState({ loading: false })
						       })

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
							/>
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