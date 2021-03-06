import React from "react";
import base from "./base";
import Members from "./Members";
import axios from "axios";
import Loader from "./Loader";

class AddMembers extends React.Component {
	constructor() {
		super();

		this.addMember = this.addMember.bind(this);
		this.publishClub = this.publishClub.bind(this);
		this.authenticate = this.authenticate.bind(this);
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
			sheet_load: "Get from Google SpreadSheet",
			loaded: false,
			tried_auth: false,
		};

		this.members = {};
	}

	componentWillMount() {
		// this runs right before the <AddMembers /> is rendered
		this.ref = base.syncState(`/1-data`, {
			context: this,
			state: `club`,
			then() {
				console.log("this is the then callback");
				this.update_temp_from_firebase();
			},
		});
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
			loaded: true,
		});
	}
	addMember(member) {
		let temp = { ...this.state.temp };
		Array.isArray(member)
			? Object.keys(member).map(
					key =>
						typeof member[key].year !== "undefined"
							? temp[`${member[key].year}`].push(member[key])
							: console.log("not pushing", key),
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
			sheet_load: "Receiving from Sheet",
			loaded: false,
		});

		const api_key = "AIzaSyB5FLnTEzfV-YrVPf7eUNFkQu9h9VJmGK4",
			sheet_id = "1YXziLAuUY4-PBBsTyXqHnl_ja3zB4OQbAybByvAxj_4",
			range = "A2:F420",
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
					sheet_load: "Loaded!",
					loaded: true,
				});

				this.process_google_spreadsheet(response);
			})
			.catch(error => {
				this.setState({
					clicked_get_from_sheet: true,
				});
				alert(error, "asdasdasdasd");
			});
		// transform the received incomplete and/or broken JSON into object and push into firebase
	}

	// transpile_the_year = (year) => year.replace(/^\w+/g, firstWord => firstWord.toLowerCase()).replace(/\s/g, "");

	process_google_spreadsheet(sheet) {
		let sheet_data = sheet.data.values; // this is an array
		let new_members = [];

		Object.keys(sheet_data).forEach(key => {
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
			new_members.push(new_member);
		});
		this.addMember(new_members);
	}

	authenticate() {
		base.authWithOAuthPopup("google", (error, authData) => {
			if (authData.user.email !== this.state.owner) {
				this.setState({ tried_auth: true });
				return null;
			}
			this.setState({ user_after_auth: authData.user.email });
		});
	}
	auth_before_push(event) {
		event.preventDefault();

		base.authWithPassword(
			{
				email: "sreetamdas@gmail.com",
				password: this.pass.value,
			},
			(nah, yeah) =>
				nah
					? console.log("error")
					: (console.log("no errors!"), this.publishClub()),
		);
		this.authForm.reset();
	}

	render_login() {
		const styles_login = {
			fontSize: "15vh",
		};
		return (
			<div className="full-page">
				<h1
					className="white-text vertical-center josefinSlab"
					style={styles_login}
				>
					{this.state.tried_auth
						? "You are not Authorized"
						: "Login Dumbass"}
					<br />
					<a
						className="btn btn-lg btn-outline-primary"
						onClick={() => this.authenticate()}
						style={{ cursor: "pointer" }}
					>
						<span style={{ color: "#fff", fontSize: "5vh" }}>
							Authenticate using Google
						</span>
					</a>
				</h1>
			</div>
		);
	}

	render() {
		// enable auth below
		if (this.state.user_after_auth !== this.state.owner) {
			return <div>{this.render_login()}</div>;
		}

		return (
			<div>
				<div className="row black-bg text-center">
					<form
						ref={input => (this.memberForm = input)}
						onSubmit={this.createMember.bind(this)}
						className="form-inline"
					>
						<div className="col-auto form-group">
							<input
								ref={input => (this.name = input)}
								type="text"
								placeholder="Name"
								className="form-control"
							/>
						</div>
						<div className="col-auto form-group">
							<input
								ref={input => (this.quote = input)}
								type="text"
								placeholder="Quote"
								className="form-control"
							/>
						</div>
						<div className="col-auto form-group">
							<select
								ref={input => (this.year = input)}
								className="form-control"
							>
								<option value="firstYears">First Year</option>
								<option value="secondYears">Second Year</option>
								<option value="thirdYears">Third Year</option>
								<option value="finalYears">Final Year</option>
								<option value="gensec">Gensec</option>
							</select>
						</div>
						<div className="col-auto form-group">
							<button type="submit" className="btn btn-primary">
								Add (locally)
							</button>
						</div>
					</form>
					<div className="col-auto offset-1">
						<button
							className={`btn ${
								this.state.sheet_load === "Loaded!"
									? "btn-success"
									: "btn-outline-primary"
							}`}
							onClick={() => this.get_from_google_spreadsheet()}
							disabled={this.state.clicked_get_from_sheet}
						>
							{this.state.sheet_load}
						</button>
					</div>
				</div>
				<div
					className="row black-bg text-center"
					style={{ paddingTop: "5vh", paddingBottom: "5vh" }}
				>
					<form
						ref={input => (this.authForm = input)}
						onSubmit={this.auth_before_push.bind(this)}
						className="form-inline offset-8"
					>
						<div className="col-auto form-group">
							<input
								ref={input => (this.pass = input)}
								type="password"
								placeholder="Auth Code"
								className="form-control"
							/>
						</div>
						<div className="col-auto form-group">
							<button type="submit" className="btn btn-warning">
								Publish this!
							</button>
						</div>
					</form>
				</div>
				<div className="black-bg">
					{this.state.loaded ? (
						Object.keys(this.state.temp).map(
							key =>
								this.state.temp[key].length !== 0 ? (
									<Members
										key={key}
										list={this.state.temp[key]}
									/> // Passes an entire batch at a time
								) : (
									console.log("")
								),
						)
					) : (
						<Loader message="Loading" />
					)}
				</div>
			</div>
		);
	}
}

export default AddMembers;
