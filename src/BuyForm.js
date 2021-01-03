import React, { Component } from 'react'
import tokenLogo from "./eth123.png";
import ethLogo from "./eth123.png";
const BigNumber = require('bignumber.js');

class BuyForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			output: '0', //ethSent
			addressFrom: 0,
			addressTo: 0,
			duration: 0, //in Days
			durationH: 0,
			durationM: 0,
		}
	}

	render() {
		return (
		<div className = "column1">
			<form className="forms" onSubmit={(event,event1,event2,event3) => {
					event.preventDefault()
					let etherAmount
					etherAmount = this.input.value.toString()
					etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
					
					let addressT
					addressT = this.input2.value
					
					let dur
					dur = this.input3.value
					
					let durH
					durH = this.input4.value
					
					let durM
					durM = this.input5.value
					this.props.buyTokens(etherAmount, addressT, dur,durH,durM)
				}}>
				<div>
					<label className="float-left"><b>Lock Ethereum</b></label>
					<span className="float-right text-muted">
						
					</span>
				</div>
				<div className="input-group mb-4">
					<input
						type="text"
						onChange={(event) => {
							const etherAmount = this.input.value.toString()
							this.setState({
								output: etherAmount
							})
						}}
						ref={(input) => { this.input = input }}
						className="form-control form-control-lg"
						placeholder="Eth Amount"
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
									ref={(input3) => { this.input3 = input3}}
									className="form-control form-control-lg"
									placeholder="Days"
									required />
									<input
										type="text"
										onChange={() => {
											const durH = this.input.value.toString()
											this.setState({
												durationH: durH
											})
										}}
										ref={(input4) => { this.input4 = input4}}
										className="form-control form-control-lg"
										placeholder="Hours"
										required />
										<input
											type="text"
											onChange={() => {
												const durM = this.input.value.toString()
												this.setState({
													durationM: durM
												})
											}}
											ref={(input5) => { this.input5 = input5}}
											className="form-control form-control-lg"
											placeholder="Minutes"
											required />
					<div className="input-group-append">
						<div className="input-group-text">
							<img src={ethLogo} height='32' alt=""/>
							&nbsp;&nbsp;&nbsp;
						</div>
					</div>
				</div>
				<div>
					<label className="float-left"><b>Locking:</b></label>
					<span className="float-right text-muted">
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
							
							&nbsp;
						</div>
					</div>
				</div>
				<div className="mb-5">
					<span className="float-left text-muted"></span>
					<span className="float-right text-muted"></span>
				</div>
				<button type="submit" className="button">Lock Your Assets</button>
			</form>
			</div>
		);
	}
}

export default BuyForm;

//Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}