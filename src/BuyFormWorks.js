import React, { Component } from 'react'
import tokenLogo from "./eth.png";
import ethLogo from "./eth.png";

class BuyForm extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			output: '0', //ethSent
			addressFrom: 0,
			addressTo: 0,
			duration: 0, //in Days
		}
	}

	render() {
		return (
			<form className="mb-3" onSubmit={(event,event1,event2,event3) => {
					event.preventDefault()
					let etherAmount
					etherAmount = this.input.value.toString()
					etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
					
					let addressF
					addressF = this.input1.value
					
					let addressT
					addressT = this.input2.value
					
					let dur
					dur = this.input3.value;
					this.props.buyTokens(etherAmount, addressF, addressT, dur)
				}}>
				<div>
					<label className="float-left"><b>Input</b></label>
					<span className="float-right text-muted">
						Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}
					</span>
				</div>
				<div className="input-group mb-4">
					<input
						type="text"
						onChange={(event) => {
							const etherAmount = this.input.value.toString()
							this.setState({
								output: etherAmount * 100
							})
						}}
						ref={(input) => { this.input = input }}
						className="form-control form-control-lg"
						placeholder="Eth Amount"
						required />
						<input
							type="text"
							onChange={() => {
								const addressF = this.input.value.toString()
								this.setState({
									addressFrom: addressF
								})
							}}
							ref={(input1) => { this.input1 = input1 }}
							className="form-control form-control-lg"
							placeholder="Address From"
							required />
							<input
								type="text"
								onChange={() => {
									const addressT = this.input.value.toString()
									this.setState({
										addressTo: addressT
									})
								}}
								ref={(input2) => { this.input2 = input2 }}
								className="form-control form-control-lg"
								placeholder="Address To"
								required />
								<input
									type="text"
									onChange={() => {
										const dur = this.input.value.toString()
										this.setState({
											duration: dur
										})
									}}
									ref={(input3) => { this.input3 = input3 }}
									className="form-control form-control-lg"
									placeholder="Days"
									required />
					<div className="input-group-append">
						<div className="input-group-text">
							<img src={ethLogo} height='32' alt=""/>
							&nbsp;&nbsp;&nbsp; ETH
						</div>
					</div>
				</div>
				<div>
					<label className="float-left"><b>Output</b></label>
					<span className="float-right text-muted">
						Balance: {window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')}
					</span>
				</div>
				<div className="input-group mb-2">
					<input
						type="text"
						className="form-control form-control-lg"
						placeholder="0"
						value={this.state.output}
						disabled
					/>
					<div className="input-group-append">
						<div className="input-group-text">
							<img src={tokenLogo} height='32' alt=""/>
							&nbsp; DApp
						</div>
					</div>
				</div>
				<div className="mb-5">
					<span className="float-left text-muted">Exchange Rate</span>
					<span className="float-right text-muted">1 ETH = 100 DApp</span>
				</div>
				<button type="submit" className="btn btn-primary btn-block btn-lg">SWAP!</button>
			</form>
		);
	}
}

export default BuyForm;