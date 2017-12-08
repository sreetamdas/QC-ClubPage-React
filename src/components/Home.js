import React from 'react';
import Header from './Header';
import Members from './Members'
import base from './base'
import samples from './sample'

class Home extends React.Component {
	constructor() {
		super();

        this.addGensec = this.addGensec.bind(this);
        this.loadSamples = this.loadSamples.bind(this);

		this.state = {
			gensec: {},
			final_years: {},
			third_years: {},
			second_years: {},
			n00bs: {},
		};
	}

	componentWillMount() {
		// this runs right before the <App> is rendered
		this.ref = base.syncState(`/primary-data`, {
			context: this,
			state: 'gensec',
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	addGensec(data) {
		// update our state
		const gensec = { ...this.state.gensec };
		// add in our new fish
		const timestamp = Date.now();
		gensec[`gensec-${timestamp}`] = data;
		// set state
		this.setState({ gensec });
	}

    loadSamples() {
        this.setState({
            gensec: samples
        });
	}
	

	render() {
		console.log(this.gensec);

		return (
			<div className="dark-bg">
				{/* <Header /> */}
				{Object.keys(this.state.gensec).map(key => (
					<Members 
						key={key}
						details={this.state.gensec[key]}	
					/>
				))}
			</div>
		);
	}
}

export default Home;