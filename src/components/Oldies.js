import React from "react";
import Members from "./Members";
import base from "./base";
import Loader from "./Loader";
import Header from "./Header";
import Footer from "./Footer";
// import LoadingBar from "react-loadingbar";

class Oldies extends React.Component {
	constructor() {
		super();

		this.add_some = this.add_some.bind(this);

		this.state = {
			exMembers: {},
			loaded: false,
			progress: 30,
		};
	}

	componentWillMount() {
		// this runs right before the <Home /> is rendered
		this.ref = base.syncState(`/x-data`, {
			context: this,
			state: `exMembers`, // add something here?
			then() {
				this.setState({
					loaded: true,
				});
			},
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

	add_some() {
		const member = {
			some: "thing",
		};
		this.setState({
			exMembers: member,
		});
	}

	render() {
		this.add_some();
		return (
			<div className="black-bg">
				{this.state.loaded ? <Header /> : null}
				{this.state.loaded ? (
					Object.keys(this.state.exMembers).map(
						key => (
							<Members
								key={key}
								list={this.state.exMembers[key]}
							/>
						), // Passes an entire batch at a time
					)
				) : (
					<Loader message="Loading" />
				)}
				{this.state.loaded ? <Footer /> : null}
				{/* <Loader message="Loading" /> */}
			</div>
		);
	}
}

export default Oldies;
