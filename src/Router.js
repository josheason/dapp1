	import React, { Component } from 'react'
	import { BrowserRouter, Route, Switch,Link } from 'react-router-dom';
	import Web3 from 'web3'
	import Token from './contracts/LockToken.json'
	import EthSwap from './contracts/Lock.json'
	import Navbar from './Navbar'
	import Main from './Main'
	import './App.css'
	import Eth from './AppWorks'
	import App from './App'

	class Router extends Component{
		
		
		render(){
			
			return(
				<Switch>
				<Route path="/" component={App} exact/>
				<Route path="/ethereum-locker" component={Eth}/>
				
				
				</Switch>
			);
		}
	}
	export default Router;