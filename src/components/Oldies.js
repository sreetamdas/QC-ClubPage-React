import React from "react";
import Members from "./Members";
import base from "./base";
import Loader from "./Loader";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

class Oldies extends React.Component {
	constructor() {
		super();

		this.addMember = this.addMember.bind(this);

		this.state = {
			exMembers: {
				"2016": [],
				"2017": [],
			},
			loaded: false,
			devOptions: false,
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

	addMember(member) {
		let exMembers = { ...this.state.exMembers };
		Array.isArray(member)
			? Object.keys(member).map(
					key =>
						typeof member[key].year !== "undefined"
							? exMembers[`${member[key].year}`].push(member[key])
							: console.log("not pushing", key),
				)
			: exMembers[`${member.year}`].push(member);
		this.setState({
			exMembers: exMembers,
		});
	}

	get_from_google_spreadsheet() {
		this.setState({
			loaded: false,
		});

		const api_key = "AIzaSyB5FLnTEzfV-YrVPf7eUNFkQu9h9VJmGK4",
			sheet_id = "1YXziLAuUY4-PBBsTyXqHnl_ja3zB4OQbAybByvAxj_4",
			range = "A2:F420",
			url = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/Sheet3!${range}`;

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
					loaded: true,
				});
				console.log(response);

				this.process_google_spreadsheet(response);
			})
			.catch(error => {
				this.setState({
					clicked_get_from_sheet: true,
				});
				alert(error, "asdasdasdasd");
			});
	}
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
						new_member[`year`] = sheet_data[key][i];
						break;
					default:
						break;
				}
			});
			new_members.push(new_member);
		});
		this.addMember(new_members);
	}

	render() {
		return (
			<div className="black-bg">
				<button
					className="btn btn-outline-primary"
					onClick={() => this.get_from_google_spreadsheet()}
					style={!this.state.devOptions ? { display: "none" } : {}}
				>
					Get
				</button>
				{this.state.loaded ? (
					<Header heading="Quiz Club Oldies" />
				) : null}
				{this.state.loaded ? (
					Object.keys(this.state.exMembers).map(
						key => (
							<Members
								key={key}
								list={this.state.exMembers[key]}
								heading={`Batch of ${key}`}
							/>
						), // Passes an entire batch at a time
					)
				) : (
					<Loader message="Loading" />
				)}
				{this.state.loaded ? <Footer /> : null}
			</div>
		);
	}
}

export default Oldies;
