import React, { Component } from 'react'
import ethLogo from "./daic1.png";

class ApproveFormDAIC extends Component {
	constructor(props) {
		super(props)
		this.state = {
			output: 0, //Asset ID
		}
	}

	render() {
		return (
		<div className = "column1a">
			<form className="forms" onSubmit={(event,event1,event2,event3) => {
					event.preventDefault()
					let etherAmount12
					etherAmount12 = this.input.value.toString()
					etherAmount12 = window.web3.utils.toWei(etherAmount12, 'Ether')
			
					this.props.approveTokens(etherAmount12)
				}}>
				<div>
					<label className="float-left"><b>Approve Compound DAI</b></label>
					<span className="float-right text-muted">
						
					</span>
				</div>
				<div className="input-group mb-4">
					<input
						type="text"
						onChange={(event) => {
							const etherAmount12 = this.input.value.toString()
							this.setState({
								output: etherAmount12
							})
						}}
						ref={(input) => { this.input = input }}
						className="inputsL"
						placeholder="Compound DAI Amount"
						required />
					<div className="input-group-append">
						<div className="input-group-text">
							<img src={ethLogo} height='32' alt=""/>
							&nbsp;&nbsp;&nbsp;
						</div>
					</div>
				</div>
				<div>
					<label className="float-left"><b>Approving:</b></label>
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
				<button type="submit" className="button">Approve</button>
			</form>
			</div>
		);
	}
}

export default ApproveFormDAIC;

//Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}