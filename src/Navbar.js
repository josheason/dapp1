import React, { Component } from 'react'
import connected from "./connected1.png";


class Navbar extends Component {

	render() {
		return (
			<nav className="nav">

						<small className="nav">
							<b><small id="account">{this.props.account}</small></b>
						</small>

						{ this.props.account
							? <img src={connected} height='32' alt=""/>
							: <span></span>
						}

			</nav>
		);
	}
}

export default Navbar;