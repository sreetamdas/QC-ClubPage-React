import React from 'react';
import base from './base';
import Members from './Members'
import axios from 'axios';

class AddMembers extends React.Component {
	constructor() {
		super();

		this.addMember = this.addMember.bind(this);
		this.publishClub = this.publishClub.bind(this);
		this.authHandler = this.authHandler.bind(this);

		this.state = {
			club: {
				gensec: [],
				finalYears: [],
				n00bs: [],
				secondYears: [],
				thirdYears: [],
			},
			temp: {
				gensec: [],
				finalYears: [],
				n00bs: [],
				secondYears: [],
				thirdYears: [],
			},
			user_after_auth: null,
			owner: "quizclub@student.nitw.ac.in"
		};

		this.members = {};
	}

	componentDidMount() {
		// this runs right before the <AddMembers /> is rendered
		this.ref = base.syncState(`/1-data`, {
			context: this,
			state: `club`, // add something here?
		});

		// check if there is any information in the club state after synving from

		// const localStorageRef = localStorage.getItem(`club_temp`);

		// if (localStorageRef) {
		// 	// update our App component's order state
		// 	this.setState({ club: JSON.parse(localStorageRef) });
		// }
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`club_temp`, JSON.stringify(nextState.temp));
	}

	addMember(member) {
		let temp = this.state.temp;
		temp[`${member.year}`].push(member);
		this.setState({
			temp: temp,
		});
	}

	publishClub() {
		this.setState({
			club: this.state.temp,
		});
	}

	createMember(event) {
		event.preventDefault();

		const member = {
			name: this.name.value,
			quote: this.quote.value,
			year: this.year.value,
		};

		this.addMember(member);
	}

	get_from_google_spreadsheet() {

		const api_key = "AIzaSyB5FLnTEzfV-YrVPf7eUNFkQu9h9VJmGK4",
			sheet_id = "1YXziLAuUY4-PBBsTyXqHnl_ja3zB4OQbAybByvAxj_4",
			range = "A1:D6",
			url = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/Sheet1!${range}`;

		const final = `${url}?key=${api_key}`;
		console.log(`request at ${final}`);

		axios.get(url, {
			params: {
				key: api_key
			}
		})
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			alert(error)
		})
// transform the received incomplete and/or broken JSON into object and push into firebase
	}

	authenticate() {
	    base.authWithOAuthPopup("google", this.authHandler);
	}

	authHandler(error, authData) {
		console.log(authData.user);
		this.setState({
			user_after_auth: authData.user.email
		})

		if(this.state.user_after_auth === this.state.owner) {
			this.owner_is_signed_in = true;
		}
	}

	render_login() {
		return(
			<div>
				<p>Sign in to auth dumbass</p>
				<button onClick={() => this.authenticate()}>Using Google</button>
			</div>
		)
	}

	render() {
		if (this.state.user_after_auth !== this.state.owner) {
			return <div>{this.render_login()}</div>;
		}

		return (
			<div>
				<form
					ref={input => (this.memberForm = input)}
					onSubmit={this.createMember.bind(this)}
				>
					<input
						ref={input => (this.name = input)}
						type="text"
						placeholder="Name"
					/>
					<input
						ref={input => (this.quote = input)}
						type="text"
						placeholder="Quote"
					/>
					<select ref={input => (this.year = input)}>
						<option value="n00bs">n00b</option>
						<option value="secondYears">secondYear</option>
						<option value="thirdYears">thirdYear</option>
						<option value="finalYears">finalYear</option>
						<option value="gensec">Gensec</option>
					</select>
					<button type="submit">Submit this!</button>
					<button type="submit" onClick={() => this.publishClub()}>
						Publish this!
					</button>
					<button type="submit" onClick={() => this.get_from_google_spreadsheet()}>
						Get from Sheet
					</button>
				</form>
				{Object.keys(this.state.temp).map(key => (
					<Members 
						key={key}
						details={this.state.temp[key]}	
					/>
				))}
			</div>
		);
	}
}

export default AddMembers;
