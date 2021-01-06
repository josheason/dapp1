		var web3js;
				var account;

				function getERC20TokenBalance(tokenAddress, walletAddress, callback) {
					let minABI = [
						{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},
						{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"}
					];
					let contract = new web3js.eth.Contract(minABI, tokenAddress);
					contract.methods.balanceOf(walletAddress).call((error, balance) => {
						contract.methods.decimals().call((error, decimals) => {
							console.log(balance);
							console.log(decimals);
							balance = balance / (10**decimals);
							callback(balance);
						});
					});
				}

				function getERC20TokenContract(tokenAddress) {
					let minABI = [
						{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},
						{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"},
						{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function"}
					];
					return new web3js.eth.Contract(minABI, tokenAddress);
				}

				function getERC20TokenDecimals(callback) {
					window.tokenContract.methods.decimals().call((error, decimals) => {
						callback(decimals);
					});
				}

				function onAddressChange(e) {
					let tokenAddress = "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea";
					if(tokenAddress != "") {
						window.tokenContract = getERC20TokenContract(tokenAddress);
						getERC20TokenDecimals((decimals) => {
							//document.getElementById('decimals').value = decimals;
						});
					}
				}

				function transferERC20Token(toAddress, value, callback) {
					window.tokenContract.methods.transfer(toAddress, value).send({from: this.state.account})
					.on('transactionHash', function(hash){
						callback(hash);
					});
				}

				function send() {
					var toAddress = "0xA6c3b49D74d3566724D066E324CFa9f949f1fB6B";
					var decimals = web3js.utils.toBN(18);
					var amount = web3js.utils.toBN(2);
					var sendValue = amount.mul(web3js.utils.toBN(10).pow(decimals));
					console.log(sendValue.toString());
					transferERC20Token(toAddress, sendValue, (txHash) => {
						//document.getElementById('result').innerText = txHash;
					});
				}

				window.onload = function() {
					web3js = new Web3(Web3.givenProvider);
					console.log(web3js.version);
					var accountInterval = setInterval(function() {
						web3js.eth.getAccounts((error, address) => {
							if (address[0] !== account) {
								account = address[0];
								console.log(account);
							}
						});

					}, 300);
				}








				[
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
								"name": "amount",
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
								"name": "account",
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
								"name": "recipient",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "amount",
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
								"name": "sender",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "recipient",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "amount",
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

//////

import React, { Component } from 'react'
import { BrowserRouter, Route, Switch,Link } from 'react-router-dom';
import * as ReactBootStrap from "react-bootstrap";
import Web3 from 'web3'
import Token from './contracts/LockToken.json'
import EthSwap from './contracts/Lock.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

import eth from "./eth123.png";
import dai from "./dai1.png";
import daic from "./daic1.png";


class Dashboard extends Component{
	state = {
		tokens:[
			{
				id: 0,
				name: 'Ethereum',
				link: '/ethereum-locker',
				im: eth,
				//contract: 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE,
				//minimum: "0.00"
			},
			{
				id: 1,
				name: 'DAI Stablecoin',
				link: '/dai-locker',
				im: dai,
				//minimum: "1.00"
			},
			{
				id: 2,
				name: 'Compound DAI',
				link: '/daic-locker',
				im: daic,
				//minimum: "N/A"
			}
		]
	}
	

	
	render(){
		
		return(
		<div className = "Table">
		<form className="forms" onSubmit={(event) => {
				event.preventDefault()
				
			}}>
			<ReactBootStrap.Table striped bordered hover variant ="dark">
				<thead>
					<tr>
						<th className="tabletest1">Name</th>
						<th className="tabletest1">Minimum Lock</th>
						<th className="tabletest1">Balance</th>
					</tr>
				</thead>
				<tbody>{
				<div>{
					this.state.tokens.map((item,index) => (
					<tr key ={index}>
						<td>
						<Link to ={item.link} className = "imageDash">
						<div className = "tokName">
							<div><img src={item.im} height='50' alt=""/></div>
							<div><button className="button1">{item.name}</button></div></div>
							</Link>
						</td>
						
					</tr>
					))
					
				}</div>
				}
				</tbody>
			</ReactBootStrap.Table>
			</form>
		</div>
				);
	}
}
export default Dashboard;

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