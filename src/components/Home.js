import React from "react";
import Members from "./Members";
import base from "./base";
import Loader from "./Loader";
import Header from "./Header";
import Footer from "./Footer";
import QCNavbar from "./QCNavbar";
import { ProgressBar } from "reprogressbars";

class Home extends React.Component {
	constructor() {
		super();

		this.sortMembers = this.sortMembers.bind(this);

		this.state = {
			clubMembers: {},
			loaded: false,
			isLoading: true,
		};
	}

	componentWillMount() {
		// this runs right before the <Home /> is rendered
		this.ref = base.syncState(`/1-data`, {
			context: this,
			state: `clubMembers`, // add something here?
			then() {
				this.setState({
					isLoading: false,
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

	render() {
		return (
			<div className="black-bg">
				<ProgressBar
					isLoading={this.state.isLoading}
					// className="fixed-progress-bar"
					color="#f73d1c"
					useBoxShadow="true"
					height="3px"
				/>
				<QCNavbar />
				{this.state.loaded ? (
					<React.Fragment>
						<Header heading="The Quiz Club Fam" />
						{Object.keys(this.sortMembers()).map(
							key =>
								this.state.clubMembers[key].length !== 0 ? (
									<Members
										key={key}
										list={this.state.clubMembers[key]}
									/> // Passes an entire batch at a time
								) : null,
						)}
						<Footer />
					</React.Fragment>
				) : (
					<Loader message="Loading" />
				)}
			</div>
		);
	}
}

export default Home;
