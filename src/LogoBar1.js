import React, { Component } from 'react'
import connected from "./connected1.png";
import back from "./whitehomeB.png";
import metaLogo from "./metaconnect1.png";
import Logo from "./vaultLogo.png";
import { BrowserRouter, Route, Switch,Link } from 'react-router-dom';


class LogoBar1 extends Component {

	render() {
		return (
			<nav className="logoBar">
			
			
			
			<div className="logoHead"><Link to="/"><img src={Logo} height='80' alt=""/></Link></div>
			<div className="accHeader">
			
						<small>
							<b className="lil"><small id="account">{this.props.account}</small></b>
						</small>
						{' '}
						{ this.props.account
							? <img src={connected} height='20' alt=""/>
							: <span></span>
						}
						{ this.props.account
							? <img src={metaLogo} height='30' alt=""/>
							: <span></span>
						}
			</div>
			<div className ="backBut"><Link to="/" className="imageDash1">{'Back'}</Link></div>
			</nav>
		);
	}
}

export default LogoBar1;