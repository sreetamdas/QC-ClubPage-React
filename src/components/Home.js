import React from "react";
import Members from "./Members";
import base from "./base";

// API Key for Google Spreadsheets: AIzaSyB5FLnTEzfV-YrVPf7eUNFkQu9h9VJmGK4

class Home extends React.Component {
	constructor() {
		super();

		this.sortMembers = this.sortMembers.bind(this);

		this.state = {
			clubMembers: {},
		};
	}

	componentWillMount() {
		// this runs right before the <Home /> is rendered
		this.ref = base.syncState(`/1-data`, {
			context: this,
			state: `clubMembers`, // add something here?
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	sortMembers() {
		const order = [
			"gensec",
			"finalYears",
			"thirdYears",
			"secondYears",
			"firstYears",
		],
			sorted_club = {};

		for (let i = 0; i < order.length; i++) {
			const element = order[i];
			Object.keys(this.state.clubMembers).forEach(key => {
				if (key === element) {
					sorted_club[key] = this.state.clubMembers[key];
				}
			});
		}
		return sorted_club;
	}

	render() {
		return (
			<div className="black-bg">
				{/* <Header /> */}
				{Object.keys(this.sortMembers()).map(
					key =>
						this.state.clubMembers[key].length !== 0 ? (
							<Members
								key={key}
								list={this.state.clubMembers[key]}
							/> // Passes an entire batch at a time
						) : (
							console.log("")
						),
				)}
				<h1>Rendered</h1>
			</div>
		);
	}
}

export default Home;
