import React, {Component} from "react";
import community_config from "../conf/community-conf";

class FilterItemCheck extends Component{
	constructor(props){
		super(props);

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
								return (
									<label className="filter-option" key={this.props.filterName + index}>{item}
										<input type="checkbox" id={this.props.filterName + "[" + index + "]"}
											   value={index} onClick={this.onCheck}
											   defaultChecked={this.checks[index] === '1'}
										/>
										<span className="filter-checkmark" key={this.props.filterName + "check" + index}> </span>
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

export default FilterItemCheck;