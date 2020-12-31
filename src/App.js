import React, { Component } from 'react'
import Web3 from 'web3'
import Token from './contracts/LockToken.json'
import EthSwap from './contracts/Lock.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'
import {LOCKTOKEN_TODO_LIST_ADDRESS, LOCKTOKEN_TODO_LIST_ABI,LOCK_TODO_LIST_ADDRESS,LOCK_TODO_LIST_ABI, myFunction} from './config';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
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
  
  /*async buyTokensHelp(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    //this.state.ethSwap.methods.lock(this.state.account)
    
    
  }*/

  buyTokens = (etherAmount, addressT, dur) => {
    window.alert(etherAmount + " " + this.state.account + " " + addressT + " " + dur)
    this.setState({ loading: true })
    //this.state.token.methods.mint(addressT, etherAmount).send({from: addressF})
    /*this.state.ethSwap.methods.activateToken(addressF).call()*/
    this.state.ethSwap.methods.lock('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', etherAmount, dur, addressT, 0, false).send({value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
       })
      /*this.state.ethSwap.methods.addToken(addressT, 1, [1,2,3], [1,2,3]).send({from: addressF}).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })*/
      /*this.state.ethSwap.methods.getTokens(1,3).send({from: addressF}).on('transactionHash', (hash) => {this.setState({loading: false})
      })*/
  }
  //0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
  //0x1168C9723ECf0EAD7e83C16c2693A9e0C794b9Db
  //0xA6c3b49D74d3566724D066E324CFa9f949f1fB6B
  
    //this.state.ethSwap.methods.buyTokens().send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
      //this.setState({ loading: false })
   // })

  //sellTokens = (tokenAmount) => {
   // this.setState({ loading: true })
   // this.state.token.methods.approve(this.state.ethSwap.address, tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
     // this.state.ethSwap.methods.sellTokens(tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
       // this.setState({ loading: false })
      //})
    //})
 // }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      token: {},
      ethSwap: {},
      ethBalance: '0',
      tokenBalance: '0',
      loading: true
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
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;