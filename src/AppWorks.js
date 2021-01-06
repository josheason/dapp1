import React, { Component } from 'react'
import Web3 from 'web3'
import Token from './contracts/LockToken.json'
import EthSwap from './contracts/Lock.json'
import Navbar from './Navbar'
import LogoBar from './LogoBar1'
import Main from './Main'
import './App.css'

const BigNumber = require('bignumber.js');

class AppWorks extends Component {

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
    dur = dur * 86400 + durH * 3600 + durM * 60
    this.setState({ loading: true })
    this.state.ethSwap.methods.lock('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', etherAmount, dur, addressT, 0, false).send({value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
       })

  }
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
        //var id = this.state.ethSwap.methods.getAssetIds(this.state.account).call()
      }
      
      checkID = async () => {
        await window.alert(this.state.id)
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
      id: ["0","1","2","3","4","5","6","7"],
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
    </div>    );
  }
}

export default AppWorks;