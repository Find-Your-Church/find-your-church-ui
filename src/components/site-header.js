import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getUserInfo, logoutUser} from "../actions/auth-actions";

class SiteHeader extends Component{
	constructor(props){
		super(props);
		this.state = {
			showedAdminMenu: false,
		};

		// this.props.getUserInfo({user_id: this.props.auth.user.id,});

		this.toggleAdminMenu = this.toggleAdminMenu.bind(this);
		this.hideAdminMenu = this.hideAdminMenu.bind(this);
	}

	toggleAdminMenu(){
		this.setState({showedAdminMenu: !this.state.showedAdminMenu});
	}

	hideAdminMenu(){
		if(this.state.showedAdminMenu)
			this.setState({showedAdminMenu: false});
	}

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
		window.location.href = "/login-popup";
	};

	render(){
		return (
			<div>
				<header className="site-header w3-bar">
					<Link to="/">
						<img className="site-logo" src={"/img/logo.svg"}
							 sizes="(max-width: 479px) 144.546875px, 216.8125px" alt="site logo"/>
					</Link>

					{this.props.auth.isAuthenticated ?
						<Link to="#" onClick={this.toggleAdminMenu} className="header-3lines-menu w3-bar-item w3-right">
							<i className="fas fa-caret-down"> </i>
						</Link>
						: null}
					{this.props.auth.isAuthenticated ? (
							<Link to="/dashboard/account" className="w3-bar-item w3-right">
								<span className={"headerprofpic-welcome"}>
									<span className={"w3-hover-text-white"}>{this.props.auth.user.fname}</span>
								</span>
								<div className="headerprofpic-div w3-right">
									<img src={"/uploaded/profiles/5de7326365d48a7932daf64f.jpg"}
										 alt={this.props.auth.user.fname} className="image-4"/>
								</div>
							</Link>
						)
						: null}

					{!this.props.auth.isAuthenticated ?
						<Link to="/register-popup" className="sign-up-link w3-bar-item w3-right w3-text-white">
							Create an Account
						</Link>
						: null}
					{!this.props.auth.isAuthenticated ?
						< Link to="/login-popup" className="w3-bar-item w3-right w3-hover-text-white">
							Sign In
						</Link>
						: null}
					{!this.props.auth.isAuthenticated ?
						<Link to="/" className="w3-bar-item w3-right w3-hover-text-white">
							Home
						</Link>
						: null}
				</header>
				<div className="admin-menu w3-animate-top"
					 onClick={this.toggleAdminMenu} onMouseLeave={this.hideAdminMenu}
					 style={{display: this.state.showedAdminMenu ? "block" : "none"}}>
					<nav role="navigation" className="global-navcontainer w-nav-menu w--nav-menu-open">
						<Link to="/" className="header-navlink w-nav-link w--nav-link-open">
							Home</Link>
						<Link to="/dashboard" className="header-navlink w-nav-link w--nav-link-open">
							Dashboard</Link>
						<Link to="/dashboard/account"
							  className="header-navlink w-nav-link w--nav-link-open">
							Account</Link>
						<Link to="#" onClick={this.onLogoutClick}
							  className="header-navlink w-nav-link w--nav-link-open">
							Sign Out</Link>
					</nav>
				</div>
			</div>
		);
	}
}

SiteHeader.propTypes = {
	auth: PropTypes.object.isRequired,
	getUserInfo: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(
	mapStateToProps,
	{getUserInfo, logoutUser}
)(SiteHeader);
