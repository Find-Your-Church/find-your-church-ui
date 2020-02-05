import React, {Component} from "react";
import community_config from "../conf/community-conf";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class SearchFilterCheck extends Component{
	constructor(props){
		super(props);

		this.max_length = this.props.value.length;

		this.checks = this.props.value.split("");

		this.state = {
			collapsed: props.collapsed || false,
		};

		this.toggleCollapse = this.toggleCollapse.bind(this);
	}

	toggleCollapse(){
		this.setState({collapsed: !this.state.collapsed});
	}

	onCheck = e => {
		this.checks = this.props.value.split("");
		this.checks[e.target.value] = e.target.checked ? '1' : '0';
		this.props.send(this.checks.join(""));
	};

	render(){
		return this.props.send ? (
				<div className="filter-div">
					<div className={"flexdiv-left labels"}>
						<label className={"filter-label" + (this.state.collapsed ? " collapsed" : "")}
							   onClick={this.toggleCollapse}>{this.props.filterTitle}</label>
					</div>
					{
						this.state.collapsed ? null :
							this.props.items.map((item, index) => {
								const count = this.props.community.counts[this.props.filterName] ? this.props.community.counts[this.props.filterName][this.max_length - index - 1] : 0;
								const checked = this.props.community.criteria.filter[this.props.filterName].split("")[index] === "1";
								return (
									<label className={"filter-option" + (count === 0 ? " disabled" : "")} key={this.props.filterName + index}
										   style={{display: "block"}}>{item}
										<input type="checkbox" id={this.props.filterName + "[" + index + "]"}
											   value={index} onClick={this.onCheck}
											   defaultChecked={this.checks[index] === '1'}
											   disabled={count === 0}
											   checked={checked}
										/>
										<span className={"filter-checkmark" + (count === 0 ? " disabled" : "")}
											  key={this.props.filterName + "check" + index}> </span>
										&nbsp;
										{count > 0 ? <>({count})</> : null}
									</label>
								)
							})
					}
				</div>
			)
			: (
				<div className={"view-filter w3-row"}>
					<div className={"filter-title w3-col l4"}>{this.props.filterTitle}</div>
					<div className={"filter-value w3-col l8"}>
						{this.props.items.map((item, index) => {
							return this.checks[index] === '1' ? (
									<span className={"filter-value-item"} key={this.props.filterName + "check" + index}>
									{community_config.FILTERS[this.props.filterName][index]}
									</span>
								)
								: null;
						})}
					</div>
				</div>
			)
	}
}

SearchFilterCheck.propTypes = {
	community: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	community: state.communities,
});

export default connect(
	mapStateToProps,
	{
	}
)(SearchFilterCheck);