import React, {Component} from "react";
import "../css/list-members.css";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import isEmpty from "../utils/isEmpty";
import {Link} from "react-router-dom";
import Popup from "reactjs-popup";
import redirectURL from "../utils/redirectURL";

class ListMembers extends Component{
	constructor(props){
		super(props);

		this.state = {
			is_show_menu: false,
		};

		this.toggleMenu = this.toggleMenu.bind(this);
		this.hideMenu = this.hideMenu.bind(this);
	}

	toggleMenu(){
		this.setState({is_show_menu: !this.state.is_show_menu});
	}

	hideMenu(){
		this.setState({is_show_menu: false});
	}

	render(){
		const user = this.props.user ? this.props.user : this.props.auth.user;

		return (
			<div className={"w3-large w3-text-grey w3-animate-opacity"}>
				<div className="members-container">
					<div>
						<div className="accordionrow-div">
							<div className="accordingcontainer-div">
								<div className="accordionheader-div">
									<h3>Admin</h3>
									{this.props.fromPublic ? null :
										<Popup
											trigger={<i style={{cursor: "pointer"}}
														className={"fas fa-question-circle tooltip-icon"}/>}
											position={"left top"}>
											<div>
												Community admins are the users who own and manage the community a user is viewing. You can edit the information
												displayed on your Admin Profile from your "Account" page at any time. Admins must provide at least one form of contact
												and have the ability to add or remove community members.
											</div>
										</Popup>
									}
								</div>
								<div className="accordioncontent-div">
									<div className="_10top-div">
										<div className="listing-grid profile admin">
											<div className="profile-container">
												<div className="div-block-55">
													<div className="profpic-container">
														<div className="profpic-div">
															<img src={isEmpty(user.pic) ?
																"/img/default-user.png"
																: user.pic}
																 alt="" className="image-4"/>
														</div>
													</div>
												</div>
												<div className="div-block-56">
													<div className="profile-info">
														<div className="listingrow">
															<div data-collapse="all" data-animation="default"
																 data-duration="400" className="listing-nav w-nav">
																<Link
																	to="#" className="communityname">
																	{user.fname} {user.lname}
																</Link>
																{this.props.editable && false ? (
																	<>
																		<div className="listingnav-button w-nav-button">
																			<Link to="#" className={"w3-right"}
																				  onClick={this.toggleMenu}>
																				<i className={"fas fa-ellipsis-h"}
																				   style={{color: "#a1a1a1"}}/>
																			</Link>
																		</div>
																		<nav role="navigation"
																			 className="listing-navmenu w-nav-menu"
																			 onMouseLeave={this.hideMenu}
																			 style={{display: this.state.is_show_menu ? "block" : "none"}}>
																			<div>
																				<Link to="/dashboard/account"
																					  className="listing-navlink single w-nav-link">Edit</Link>
																			</div>
																		</nav>
																	</>
																) : null}
																<div className="w-nav-overlay" data-wf-ignore="">
																</div>
															</div>
														</div>
														<div className="_10top-div icons">
															{isEmpty(user.admin_email) ? null :
																<Link to={"#"} className={"admin-info-members"}
																	  onClick={() => redirectURL("mailto:" + user.admin_email)}>
																	<div
																		title={user.admin_email}>
																		<img src={"/img/icon/icon-email-fill.svg"}
																			 alt="" className="personal-pic"/>
																	</div>
																</Link>
															}
															{isEmpty(user.phone) ? null :
																<Link to={"#"} className={"admin-info-members"}
																	  onClick={() => redirectURL("tel:" + user.phone)}>
																	<div className={"admin-info-members"}
																		 title={user.phone}>
																		<img src={"/img/icon/icon-phone-fill.svg"}
																			 alt="" className="personal-pic"/>
																	</div>
																</Link>
															}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/*
						<div className="accordionrow-div">
							<div className="accordingcontainer-div">
								<div className="accordionheader-div">
									<h3>Community</h3>
									<Popup
										trigger={<i style={{cursor: "pointer"}}
													className={"fas fa-question-circle tooltip-icon"}/>}
										position={"left bottom"}>
										<div>Tell visitors more about your community...</div>
									</Popup>
								</div>
								<div className="accordioncontent-div">
									<div className="_10top-div">
										<div className="listing-grid profile">
											<div className="profile-container">
												<div className="div-block-55">
													<div className="profpic-container">
														<div className="profpic-div">
															<img src={isEmpty(user.pic) ?
																"/img/default-user.png"
																: user.pic}
																 alt="" className="image-4"/>
														</div>
													</div>
												</div>
												<div className="div-block-56">
													<div className="profile-info">
														<div className="listingrow">
															<div data-collapse="all" data-animation="default"
																 data-duration="400" className="listing-nav w-nav">
																<Link
																	to="#" className="communityname">firstName
																	lastName</Link>
																<div className="listingnav-button w-nav-button">
																	<img
																		src="https://uploads-ssl.webflow.com/5d8507ee478ff0afbe1aa918/5de495d33719a13ca2ef267c_3dot%20Icon.png"
																		alt="" className="threedoticon"/>
																</div>
																<nav role="navigation"
																	 className="listing-navmenu w-nav-menu">
																	<div>
																		<Link to="#"
																		   className="listing-navlink single w-nav-link">Edit</Link>
																	</div>
																</nav>
																<div className="w-nav-overlay" data-wf-ignore="">
																</div>
															</div>
														</div>
														<div className="_10top-div icons">
															<div className="icon-div listing">
																<img src={"/img/social/icon-facebook.svg"} width="20" alt=""/>
															</div>
															<div className="_10left-div">
																<div className="icon-div">
																	<img src={"/img/social/icon-facebook.svg"} width="20" alt=""/>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="profile-container">
												<div className="div-block-55">
													<div className="profpic-container">
														<div className="profpic-div">
															<img src={isEmpty(user.pic) ?
																"/img/default-user.png"
																: user.pic}
																 alt="" className="image-4"/>
														</div>
													</div>
												</div>
												<div className="div-block-56">
													<div className="profile-info">
														<div className="listingrow">
															<div data-collapse="all" data-animation="default"
																 data-duration="400" className="listing-nav w-nav">
																<Link
																	to="#" className="communityname">firstName
																	lastName</Link>
																<div className="listingnav-button w-nav-button">
																	<img
																		src="https://uploads-ssl.webflow.com/5d8507ee478ff0afbe1aa918/5de495d33719a13ca2ef267c_3dot%20Icon.png"
																		alt="" className="threedoticon"/>
																</div>
																<nav role="navigation"
																	 className="listing-navmenu w-nav-menu">
																	<div>
																		<Link to="#"
																		   className="listing-navlink single w-nav-link">Edit</Link>
																	</div>
																</nav>
																<div className="w-nav-overlay" data-wf-ignore="">
																</div>
															</div>
														</div>
														<div className="_10top-div icons">
															<div className="icon-div listing">
																<img src={"/img/social/icon-facebook.svg"} width="20" alt=""/>
															</div>
															<div className="_10left-div">
																<div className="icon-div">
																	<img src={"/img/social/icon-facebook.svg"} width="20" alt=""/>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="profile-container">
												<div className="div-block-55">
													<div className="profpic-container">
														<div className="profpic-div">
															<img src={isEmpty(user.pic) ?
																"/img/default-user.png"
																: user.pic}
																 alt="" className="image-4"/>
														</div>
													</div>
												</div>
												<div className="div-block-56">
													<div className="profile-info">
														<div className="listingrow">
															<div data-collapse="all" data-animation="default"
																 data-duration="400" className="listing-nav w-nav">
																<Link
																	to="#" className="communityname">firstName
																	lastName</Link>
																<div className="listingnav-button w-nav-button">
																	<img
																		src="https://uploads-ssl.webflow.com/5d8507ee478ff0afbe1aa918/5de495d33719a13ca2ef267c_3dot%20Icon.png"
																		alt="" className="threedoticon"/>
																</div>
																<nav role="navigation"
																	 className="listing-navmenu w-nav-menu">
																	<div>
																		<Link to="#"
																		   className="listing-navlink single w-nav-link">Edit</Link>
																	</div>
																</nav>
																<div className="w-nav-overlay" data-wf-ignore="">
																</div>
															</div>
														</div>
														<div className="_10top-div icons">
															<div className="icon-div listing">
																<img src={"/img/social/icon-facebook.svg"} width="20" alt=""/>
															</div>
															<div className="_10left-div">
																<div className="icon-div">
																	<img src={"/img/social/icon-facebook.svg"} width="20" alt=""/>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="profile-container">
												<div className="div-block-55">
													<div className="profpic-container">
														<div className="profpic-div">
															<img src={isEmpty(user.pic) ?
																"/img/default-user.png"
																: user.pic}
																 alt="" className="image-4"/>
														</div>
													</div>
												</div>
												<div className="div-block-56">
													<div className="profile-info">
														<div className="listingrow">
															<div data-collapse="all" data-animation="default"
																 data-duration="400" className="listing-nav w-nav">
																<Link
																	to="#" className="communityname">firstName
																	lastName</Link>
																<div className="listingnav-button w-nav-button">
																	<img
																		src="https://uploads-ssl.webflow.com/5d8507ee478ff0afbe1aa918/5de495d33719a13ca2ef267c_3dot%20Icon.png"
																		alt="" className="threedoticon"/>
																</div>
																<nav role="navigation"
																	 className="listing-navmenu w-nav-menu">
																	<div>
																		<Link to="#"
																		   className="listing-navlink single w-nav-link">Edit</Link>
																	</div>
																</nav>
																<div className="w-nav-overlay" data-wf-ignore="">
																</div>
															</div>
														</div>
														<div className="_10top-div icons">
															<div className="icon-div listing">
																<img src={"/img/social/icon-facebook.svg"} width="20" alt=""/>
															</div>
															<div className="_10left-div">
																<div className="icon-div">
																	<img src={"/img/social/icon-facebook.svg"} width="20" alt=""/>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="profile-container">
												<div className="div-block-55">
													<div className="profpic-container">
														<div className="profpic-div">
															<img src={isEmpty(user.pic) ?
																"/img/default-user.png"
																: user.pic}
																 alt="" className="image-4"/>
														</div>
													</div>
												</div>
												<div className="div-block-56">
													<div className="profile-info">
														<div className="listingrow">
															<div data-collapse="all" data-animation="default"
																 data-duration="400" className="listing-nav w-nav">
																<Link
																	to="#" className="communityname">firstName
																	lastName</Link>
																<div className="listingnav-button w-nav-button">
																	<img
																		src="https://uploads-ssl.webflow.com/5d8507ee478ff0afbe1aa918/5de495d33719a13ca2ef267c_3dot%20Icon.png"
																		alt="" className="threedoticon"/>
																</div>
																<nav role="navigation"
																	 className="listing-navmenu w-nav-menu">
																	<div>
																		<Link to="#"
																		   className="listing-navlink single w-nav-link">Edit</Link>
																	</div>
																</nav>
																<div className="w-nav-overlay" data-wf-ignore="">
																</div>
															</div>
														</div>
														<div className="_10top-div icons">
															<div className="icon-div listing">
																<img src={"/img/social/icon-facebook.svg"} width="20" alt=""/>
															</div>
															<div className="_10left-div">
																<div className="icon-div">
																	<img src={"/img/social/icon-facebook.svg"} width="20" alt=""/>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="_20top-div">
						</div>
						*/}
					</div>
				</div>
			</div>
		);
	}
}

ListMembers.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{}
)(ListMembers);
