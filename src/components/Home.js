import React from 'react';
// import Header from './Header';
import Members from './Members'
import base from './base'
// import samples from './sample'

class Home extends React.Component {
	constructor() {
		super();

        // this.addGensec = this.addGensec.bind(this);
        // this.addMember = this.addMember.bind(this);
		// this.loadSamples = this.loadSamples.bind(this);
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

	// addGensec(data) {
	// 	// update our state
	// 	const gensec = { ...this.state.gensec };
	// 	// add in our new fish
	// 	const timestamp = Date.now();
	// 	gensec[`gensec-${timestamp}`] = data;
	// 	// set state
	// 	this.setState({ gensec });
	// }

    // loadSamples() {
    //     this.setState({
    //         gensec: samples
    //     });
	// }

	sortMembers() {
		const gensec = {};
		const n00b = {
			yello: `wofl`
		}
// , finalYears, thirdYears, secondYears, n00bs
		

		gensec[`hllelo`] = 'world'
		console.log(gensec);

		gensec[`n00bList`] = n00b
		console.log(gensec);
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