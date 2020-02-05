import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {pickCommunity, shareCommunity, reportCommunity} from "../actions/community-actions";
import "../css/communities.css"
import "../css/community-steps.css"
import SelectedFilters from "./selected-filters";

class PublicThumbnail extends Component{
	constructor(props){
		super(props);

		this.state = {
			is_viewing: false,
			is_show_menu: false,
		};

		this.goView = this.goView.bind(this);
		this.toggleMenu = this.toggleMenu.bind(this);
		this.hideMenu = this.hideMenu.bind(this);
	}

	goView(e){
		// redirect to community-step with this.props.value (community object with full info).
		// console.log(this.props.value);

		this.setState({is_viewing: true});
	}

	shareCommunity = () => {
		if(this.props.auth.isAuthenticated){
			const to_email = window.prompt("Please enter email address to be received this share-link.", "");
			this.props.shareCommunity({
				email: this.props.auth.user.email,
				to_email: to_email,
				community_id: this.props.value._id,
			});
			window.alert("Success! Sent a email to invite here.");
		}
		else{
			window.alert("You must login to share the community.");
		}
	};

	reportCommunity = () => {
		const yes = window.confirm("Are you sure to send a report mail about this community?");
		if(yes === true){
			if(this.props.auth.isAuthenticated){
				this.props.reportCommunity({
					id: this.props.auth.user.id,
					email: this.props.auth.user.email,
					community_id: this.props.value._id,
					community_name: this.props.value.community_name,
				});
				window.alert("Success! Sent a email to report a community.");
			}
			else{
				window.alert("You must login to report the community.");
			}
		}
	};

	toggleMenu(e){
		this.setState({is_show_menu: !this.state.is_show_menu});
	}

	hideMenu(e){
		this.setState({is_show_menu: false});
	}

	render(){
		return (
			this.state.is_viewing ? (
				<Redirect to={{pathname: '/public-view', state: {obj: this.props.value}}}/>
			) : (

				<div className="listing-container1" onMouseLeave={this.hideMenu}>
					<div
						className={"listingprofilepic-div" + (this.props.value.pictures && this.props.value.pictures.length > 0 ? "" : " w3-opacity-max")}
						style={{
							backgroundImage: `url('${this.props.value.pictures.length > 0 ? this.props.value.pictures[0]
								: "/img/community-default.jpg"}')`
						}}
						onClick={this.goView}>
					</div>
					<div className="listinginfo-div">
						<div className="listingrow">
							<div data-collapse="all" data-animation="default" data-duration="400"
								 className="listing-nav w-nav">
								<Link to="#" className="communityname" onClick={this.goView}>
									{this.props.value.community_name}
								</Link>
								<div className="listingnav-button w-nav-button" onClick={this.toggleMenu}>
									<i className={"fas fa-ellipsis-h"} style={{color: "#a1a1a1"}}> </i>
								</div>
								<nav role="navigation" className="w3-animate-opacity listing-navmenu w-nav-menu"
									 style={{display: this.state.is_show_menu ? "block" : "none"}}>
									<Link to="#" className="listing-navlink w-nav-link" onClick={this.shareCommunity}>
										Share
									</Link>
									<Link to="#" className="listing-navlink w-nav-link" onClick={this.reportCommunity}>
										Report
									</Link>
								</nav>
								<div className="w-nav-overlay" data-wf-ignore="">
								</div>
							</div>
						</div>
						<div className="listingrow">
							<h5 className="communitycategory">{this.props.value.category}</h5>
						</div>
						<div className="listingrow">
							<h5 className="communityaddress">{this.props.value.address}</h5>
						</div>
						<div className="listingrow">
							<SelectedFilters filter={this.props.value}/>
						</div>
					</div>
				</div>
			)
		);
	}
}

PublicThumbnail.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	pickCommunity: PropTypes.func.isRequired,
	shareCommunity: PropTypes.func.isRequired,
	reportCommunity: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{pickCommunity, shareCommunity, reportCommunity}
)(PublicThumbnail);