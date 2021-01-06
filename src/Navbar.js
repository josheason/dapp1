import React, { Component } from 'react'
import connected from "./connected1.png";
import back from "./whitehomeB.png";
import { BrowserRouter, Route, Switch,Link } from 'react-router-dom';


class Navbar extends Component {

	render() {
		return (
			<nav className="nav">
			
			<Link to="/"><img src={back} height='40' alt=""/></Link>
						<small className="nav">
							<b><small id="account">{this.props.account}</small></b>
						</small>

						{ this.props.account
							? <img src={connected} height='30' alt=""/>
							: <span></span>
						}

			</nav>
		);
	}
}

export default Navbar;