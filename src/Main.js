import React, { Component } from 'react'
import BuyForm from './BuyForm'
import SellForm from './SellForm'
import ClaimForm from './ClaimForm'
import LockTable from './LockTable'

class Main extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentForm: 'buy'
		}
	}

	render() {
		let content
		if(this.state.currentForm === 'buy') {
			content = 
			<>
			<ClaimForm 
				claimTokens = {this.props.claimTokens}
				/>
				<BuyForm
					ethBalance={this.props.ethBalance}
					tokenBalance={this.props.tokenBalance}
					buyTokens={this.props.buyTokens}
				/>
				<LockTable
					checkLocked = {this.props.checkLocked}
				/>
				</>
		} else {
			content = <SellForm
				ethBalance={this.props.ethBalance}
				tokenBalance={this.props.tokenBalance}
				sellTokens={this.props.sellTokens}
			/>
		}

		return (
			<div id="nav" className="nav1">



				<div className="" >

					<div className="">

						{content}

					</div>

				</div>

			</div>
		);
	}
}

export default Main;