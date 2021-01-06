import React, { Component } from 'react'
import { BrowserRouter, Route, Switch,Link } from 'react-router-dom';
import * as ReactBootStrap from "react-bootstrap";
import Web3 from 'web3'
import Token from './contracts/LockToken.json'
import EthSwap from './contracts/Lock.json'
import LogoBar from './LogoBar'
import Main from './Main'
import './App.css'

import eth from "./eth123.png";
import dai from "./dai1.png";
import daic from "./daic1.png";


class Dashboard extends Component{
	state = {
		tokens:[
			{
				id1: 0,
				name: 'Ethereum',
				link: '/ethereum-locker',
				im: eth,
				contract1: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
				//minimu: "0.00",
				abi: "N/A"
			},
			{
				id1: 1,
				name: 'DAI Stablecoin',
				link: '/dai-locker',
				im: dai,
				contract1: '0xc3dbf84Abb494ce5199D5d4D815b10EC29529ff8',
				//minimu: "1.00",
				abi: [
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
			},
			{
				id1: 2,
				name: 'Compound DAI',
				link: '/daic-locker',
				im: daic,
				contract1: "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",
				//minimu: "N/A",
				abi: [
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
			}
		],
		tokenAddress1: ['123','321','122','123','456','789','10','123','321','122','123','456','789','100','123','321','122','123','456','789','100'],
		tokenBal: ['123','321','122','123','456','789','10','123','321','122','123','456','789','100','123','321','122','123','456','789','100'],
	}
	
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
					let len1 = this.state.tokens.length;
					var newState1 = {};
					for(var i = 0; i < len1; i++){
						newState1[i] = await ethSwap.methods.getTokenInfo(this.state.tokens[i].contract1.toString()).call()
						if(i == 0){
							newState1[i][6] = this.state.ethBalance
						}
						else{
							var tempCon = new window.web3.eth.Contract(this.state.tokens[i].abi, this.state.tokens[i].contract1.toString())
							newState1[i][6] = await tempCon.methods.balanceOf(this.state.account).call()
						}
						newState1[i][6] = window.web3.utils.fromWei(newState1[i][6])
						newState1[i][6] = parseFloat(newState1[i][6]).toFixed(3)
					}
					this.setState({tokenAddress1: newState1});
					//window.alert(this.state.tokenAddress1[1][0])
					//window.alert(this.state.tokenAddress1[1][6])
					//window.alert(this.state.tokenAddress1[0][6])
					//var newState1 = {};
					//for(var i = 0; i < len)
					
					
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

		
			isEth = (randomProp) =>{
				if(randomProp == '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'){
					return "Ethereum";
				}
				return "Other Crypto";
			}

			
			toEth(am){
				am = window.web3.utils.fromWei(am, 'Ether')
				am = am.toString()
				am = parseFloat(am).toFixed(5)
				return am;
			}

	

	
	render(){
		
		return(
		<div>
		<LogoBar account={this.state.account} />
		<div className ="backColor">
		<div className ="homeScreen">
		<div className = "Table1">
		
		<form className="forms" onSubmit={(event) => {
				event.preventDefault()
				this.props.checkLocked()
			}}>
			<ReactBootStrap.Table striped borderless hover variant ="dark" className = "tableD">
				<thead>
					<tr>
						<th className="tabletestH"><div className="tryThis">{"Name"}</div></th>
						<th className="tabletestH"><div className="tryThis1">{"Minimum Lock"}</div></th>
						<th className="tabletestH"><div className="tryThis">{"Balance"}</div></th>
					</tr>
				</thead>
				<tbody>{
				
					this.state.tokens.map((item1,index1) => (
					<tr key ={index1}>
						<td className = "tabletest">{
							<Link to ={item1.link} className = "imageDash">
							<div className="tryThisT">
								<div className = "tokName">
									<div>
										<img src={item1.im} height='50' alt=""/>
											</div>
								
								<p className="button1">{item1.name}</p></div></div>
							</Link>
						}</td>
						<td className = "tabletest">{
							<Link to ={item1.link} className = "imageDash">
								<div className="tryThisT">{parseFloat(window.web3.utils.fromWei(this.state.tokenAddress1[index1][0])).toFixed(2)}</div>
								</Link>
						}</td>
						<td className = "tabletest"><div className="tryThisT">{this.state.tokenAddress1[index1][6]}</div></td>
						
					</tr>
					))
					
				
				}
				</tbody>
			</ReactBootStrap.Table>
			</form>
		</div>
		</div>
		</div>
		</div>
				);
	}
}
export default Dashboard;
//<td className = "tabletest">{this.state.tokenAddress1[index][6]}</td>
/*
<button className="button">Aragon Network Token</button>
<button className="button">Kyber Network Crystal</button>
<button className="button">Uniswap</button>
<button className="button">Yearn.Finance</button>
*/

/*
<div>{
	this.state.tokens.map((item,index) => (
	<div>
		<Link to ={item.link} className = "imageDash">
			<img src={item.im} height='50' alt=""/>
			<button className="button">{item.name}</button>
		</Link>
	</div>
	))
	
}</div>
*/