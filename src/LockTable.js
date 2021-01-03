import React, {Component} from 'react';
import './App.css';
import * as ReactBootStrap from "react-bootstrap";
import Web3 from 'web3'
import Token from './contracts/LockToken.json'
import EthSwap from './contracts/Lock.json'
import Navbar from './Navbar'
import Main from './Main'
import Moment from 'moment';


class LockTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			LockedAssets : [
				{ids: "", dateL: "1/2", timeL:"1", amount: "1.0", type: "ETH"},
				{ids: "", dateL: "1/3", timeL:"2", amount: "0.1", type: "ETH"},
				{ids: "", dateL: "1/4", timeL:"3", amount: "3.3", type: "ETH"},
				{ids: "", dateL: "1/5", timeL:"4", amount: "5.0", type: "ETH"},
			],
			LockedAsset:[
				{token: ["",""],amount: ["",""],startDate:["",""],endDate:["",""],lastLocked:["",""],beneficiary:["",""],status:["",""],amountThreshold:["",""]},
				{token: ["",""],amount: ["",""],startDate:["",""],endDate:["",""],lastLocked:["",""],beneficiary:["",""],status:["",""],amountThreshold:["",""]},
				{token: ["",""],amount: ["",""],startDate:["",""],endDate:["",""],lastLocked:["",""],beneficiary:["",""],status:["",""],amountThreshold:["",""]},
			],
			output: [],
			id: ['123','456','789'],
			idLength: ['72','34','86'],
			tokenAddress: ['123','321','122','123','456','789','10','123','321','122','123','456','789','100','123','321','122','123','456','789','100'],
			tokenAddress2: ['123','321','122'],
			tokenAddress3: ['123','321','122'],
			tokenAddress4: ['123','321','122'],
			tokenAddress5: ['123','321','122'],
			ind: ['0','8','16','24','32','40','48','56','64','72','80','88','96','104','112']
		}
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
				let id = await ethSwap.methods.getAssetIds(this.state.account).call()
				this.setState({id: id}) 
				let len = id.length;
				var newState = {};
				for(var i = 0; i < len; i++){
					newState[i] = await ethSwap.methods.getLockedAsset(id[i]).call()
					if(newState[i][6] == 2)
						newState[i][7] = "Yes"
					else{
						newState[i][7] = "No"
					}
				}
				this.setState({tokenAddress: newState});
				//window.alert(this.state.tokenAddress[16][7])
				//window.alert(this.state.tokenAddress[14][6])
				//window.alert(this.state.tokenAddress[8][3])
				//window.alert(this.state.tokenAddress[8][4])
				//window.alert(this.state.tokenAddress[1][2])
				/*let copy = [];
				id.forEach(async (d) =>{
					let tokenAddress = await ethSwap.methods.getLockedAsset(d).call()
					copy.push(tokenAddress)
				})
				this.setState({tokenAddress: copy})*/
				/*const updatedState = {};
				if(vars.length){
					vars.forEach(v => {
						updatedState[v] = '';
						this.setState({
							this.state:updatedState
						});
					});
				}*/
				
				
				/*let LockedAsset = this.state.LockedAsset
				let tokenAddress = await ethSwap.methods.getLockedAsset(id[0]).call()
				this.setState({tokenAddress: tokenAddress})
				let tokenAddress2 = await ethSwap.methods.getLockedAsset(id[1]).call()
				this.setState({tokenAddress2: tokenAddress2}) 
				let tokenAddress3 
				tokenAddress3= await ethSwap.methods.getLockedAsset(id[2]).call()
				this.setState({tokenAddress3: tokenAddress3}) */
				
				
				
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
		
		toDate = (random) =>{
			var d = new Date(random*1000);
			//var f = Moment(d).format('MMMM Do YYYY, h:mm:ss a');
			var f = Moment(d).format('LLL');
			return f;
		}
		
		toEth(am){
			am = window.web3.utils.fromWei(am, 'Ether')
			am = am.toString()
			am = parseFloat(am).toFixed(5)
			return am;
		}
				
	
	render(){
	return(
		<div className = "Table">
		<form className="forms" onSubmit={(event) => {
				event.preventDefault()
				this.props.checkLocked()
			}}>
			<ReactBootStrap.Table striped bordered hover variant ="dark">
				<thead>
					<tr>
						<th className="tabletest1">ID</th>
						<th className="tabletest1">Date Locked</th>
						<th className="tabletest1">Date Can Be Unlocked</th>
						<th className="tabletest1">Amount</th>
						<th className="tabletest1">Type</th>
						<th className="tabletest1">Claimed?</th>
					</tr>
				</thead>
				<tbody>{
				this.state.id.map((item, index) => (
							<tr key={index}>
								<td className="tabletest">{this.state.id[index]}</td>
								<td className="tabletest">{this.toDate(this.state.tokenAddress[index][2])}</td>
								<td className="tabletest">{this.toDate(this.state.tokenAddress[index][3])}</td>
								<td className="tabletest">{this.toEth(this.state.tokenAddress[index][1])}</td>
								<td className="tabletest">{this.isEth(this.state.tokenAddress[index][0])}</td>	
								<td className="tabletest">{this.state.tokenAddress[index][7]}</td>			
							</tr>
					))
				}
				</tbody>
			</ReactBootStrap.Table>
			</form>
		</div>
		
	);
	}
}
export default LockTable;