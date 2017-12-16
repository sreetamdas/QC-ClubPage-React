import React from "react";
import base from "./base";
import Members from "./Members";
import axios from "axios";

class AddMembers extends React.Component {
	constructor() {
		super();

		this.addMember = this.addMember.bind(this);
		this.publishClub = this.publishClub.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.update_temp_from_firebase = this.update_temp_from_firebase.bind(
			this,
		);
		this.process_google_spreadsheet = this.process_google_spreadsheet.bind(
			this,
		);

		this.state = {
			club: {
				gensec: [],
				finalYears: [],
				thirdYears: [],
				secondYears: [],
				firstYears: [],
			},
			temp: {
				gensec: [],
				finalYears: [],
				thirdYears: [],
				secondYears: [],
				firstYears: [],
			},
			user_after_auth: null,
			owner: "quizclub@student.nitw.ac.in",
			clicked_get_from_sheet: false,
			sheet_load: "Get from Google SpreadSheet"
		};

		this.members = {};
	}

	componentWillMount() {
		// this runs right before the <AddMembers /> is rendered
		// this.ref = base.syncState(`/1-data`, {
		// 	context: this,
		// 	state: `club`,
		// 	then() {
		// 		console.log("this is the then callback");
		// 		this.update_temp_from_firebase();
		// 	}
		// });
	}
	componentWillUnmount() {
		base.removeBinding(this.ref);
	}
	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`club_temp`, JSON.stringify(nextState.temp));
	}

	update_temp_from_firebase() {
		let temp_temp = { ...this.state.temp },
			temp_club = { ...this.state.club };

		Object.keys(this.state.club).forEach(key => {
			temp_temp[`${key}`] = temp_club[`${key}`];
		});
		this.setState({
			temp: temp_temp,
		});
	}
	addMember(member) {
		let temp = { ...this.state.temp };
		console.log("AddMember called", member);
		console.log(member.length);
		Array.isArray(member)
			? Object.keys(member).map(key =>
					temp[`${member[key].year}`].push(member[key]),
				)
			: temp[`${member.year}`].push(member);
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
		this.setState({
			clicked_get_from_sheet: true,
			sheet_load: "Receiving from Sheet"
		});

		const api_key = "AIzaSyB5FLnTEzfV-YrVPf7eUNFkQu9h9VJmGK4",
			sheet_id = "1YXziLAuUY4-PBBsTyXqHnl_ja3zB4OQbAybByvAxj_4",
			range = "A2:F6",
			url = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/Sheet1!${range}`;

		const final = `${url}?key=${api_key}`;
		console.log(`request at ${final}`);

		axios
			.get(url, {
				params: {
					key: api_key,
				},
			})
			.then(response => {
				// call function here
				this.setState({
					sheet_load: "Loaded!"
				})

				this.process_google_spreadsheet(response);
			})
			.catch(error => {
				this.setState({
					clicked_get_from_sheet: true,
				});
				alert(error);
			});
		// transform the received incomplete and/or broken JSON into object and push into firebase
	}

	// transpile_the_year = (year) => year.replace(/^\w+/g, firstWord => firstWord.toLowerCase()).replace(/\s/g, "");

	process_google_spreadsheet(sheet) {
		let sheet_data = sheet.data.values; // this is an array
		let new_members = [];

		Object.keys(sheet_data).forEach(key => {
			// console.log(sheet_data);
			let new_member = {}; // if higher scope then changes all attached values ???

			Object.keys(sheet_data[key]).forEach(i => {
				switch (i) {
					case `1`:
						new_member[`name`] = sheet_data[key][i];
						break;
					case `2`:
						new_member[`quote`] = sheet_data[key][i];
						break;
					case `3`:
						new_member[`image`] = sheet_data[key][i];
						break;
					case `4`:
						let transpiled_year = null;
						switch (sheet_data[key][i]) {
							case `First Year`:
								transpiled_year = `firstYears`;
								break;
							case `Second Year`:
								transpiled_year = `secondYears`;
								break;
							case `Third Year`:
								transpiled_year = `thirdYears`;
								break;
							case `Final Year`:
								transpiled_year = `finalYears`;
								break;
							case `GenSec`:
								transpiled_year = `gensec`;
								break;
							default:
								alert("Wrong year from the Form.");
								break;
						}
						new_member[`year`] = transpiled_year;
						break;
					default:
						break;
				}
			});
			// console.log(new_member);
			new_members.push(new_member);
		});
		this.addMember(new_members);
	}

	authenticate() {
		base.authWithOAuthPopup("google", this.authHandler);
	}
	authHandler(error, authData) {
		console.log(authData.user);
		this.setState({
			user_after_auth: authData.user.email,
		});

		if (this.state.user_after_auth === this.state.owner) {
			this.owner_is_signed_in = true;
		}
	}

	render_login() {
		return (
			<div>
				<p>Sign in to auth dumbass</p>
				<button onClick={() => this.authenticate()}>
					Using Google
				</button>
			</div>
		);
	}

	render() {
		// if (this.state.user_after_auth !== this.state.owner) {
		// 	return <div>{this.render_login()}</div>;
		// }

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
						<option value="firstYears">First Year</option>
						<option value="secondYears">Second Year</option>
						<option value="thirdYears">Third Year</option>
						<option value="finalYears">Final Year</option>
						<option value="gensec">Gensec</option>
					</select>
					<button type="submit">Submit this!</button>
				</form>
				<button
					className="btn btn-outline-primary"
					onClick={() => this.publishClub()}
				>
					Publish this!
				</button>
				<button
					className={`btn ${this.state.sheet_load === "Loaded!"
																	? "btn-success"
																	: "btn-outline-primary"}`
																}
					onClick={() => this.get_from_google_spreadsheet()}
					disabled={this.state.clicked_get_from_sheet}
				>
					{this.state.sheet_load}
				</button>
				{Object.keys(this.state.temp).map(
					key =>
						this.state.temp[key].length !== 0 ? (
							<Members key={key} list={this.state.temp[key]} /> // Passes an entire batch at a time
						) : (
							console.log("")
						),
				)}
			</div>
		);
	}
}

export default AddMembers;
