import React, { Component } from 'react'
import ethLogo from "./dai1.png";

class ClaimFormDAI extends Component {
	constructor(props) {
		super(props)
		this.state = {
			output: 0, //Asset ID
		}
	}

	render() {
		return (
		<div className = "column1">
			<form className="forms" onSubmit={(event,event1,event2,event3) => {
					event.preventDefault()
					let etherAmount1
					etherAmount1 = this.input.value
			
					this.props.claimTokens(etherAmount1)
				}}>
				<div>
					<label className="float-left"><b>Unlock DAI Stablecoin</b></label>
					<span className="float-right text-muted">
						
					</span>
				</div>
				<div className="input-group mb-4">
					<input
						type="text"
						onChange={(event) => {
							const etherAmount1 = this.input.value.toString()
							this.setState({
								output: etherAmount1
							})
						}}
						ref={(input) => { this.input = input }}
						className="inputsL"
						placeholder="ID"
						required />
					<div className="input-group-append">
						<div className="input-group-text">
							<img src={ethLogo} height='32' alt=""/>
							&nbsp;&nbsp;&nbsp;
						</div>
					</div>
				</div>
				<div>
					<label className="float-left"><b>Unlocking:</b></label>
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
				<button type="submit" className="button">Unlock</button>
			</form>
			</div>
		);
	}
}

export default ClaimFormDAI;

//Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}