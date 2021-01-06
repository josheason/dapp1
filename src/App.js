import React, { Component } from 'react'
import { BrowserRouter, Route, Switch,Link } from 'react-router-dom';
import Web3 from 'web3'
import Token from './contracts/LockToken.json'
import EthSwap from './contracts/Lock.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'
import Eth from './AppWorks'
import DAI from './AppWorksDAI'
import DAIC from './AppWorksDAIC'
import Dashboard from './Dashboard'

class App extends Component{
	
	
	render(){
		
		return(
		<div>
		
		
		
		
		
		<Switch>
			<Route path="/" component={Dashboard} exact/>
			<Route path="/ethereum-locker" component={Eth}/>
			<Route path="/dai-locker" component={DAI}/>
			<Route path="/daic-locker" component={DAIC}/>
		
		</Switch>
		</div>
			
		
			
		);
	}
}
export default App;