import React from 'react';
// import Members from './Members'
import base from './base'

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
		this.ref = base.syncState(`/new-data`, {
			context: this,
			state: `clubMembers`, // add something here?
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	render() {
		console.log(this.clubMembers);

		this.sortMembers();

		return (
			<div className="dark-bg">
				{/* <Header /> */}
				{/* {Object.keys(this.state.clubMembers).map(key => (
					<Members 
						key={key}
						details={this.state.clubMembers[key]}	
					/>
				))} */}
				<h1>Rendered</h1>
			</div>
		);
	}
}

export default Home;