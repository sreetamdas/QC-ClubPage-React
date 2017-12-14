import React from 'react';
import base from './base';
// import Members from './Members'

class AddMembers extends React.Component {
	constructor() {
		super();

		this.addMember = this.addMember.bind(this);

		this.state = {
			club: [],
			gensec: [],
			finalYears: [],
			n00bs: [],
			secondYears: [],
			thirdYears: []
		};

		this.yearOf = `n00b`;

		// const gensec = [0], finalYears = [0], thirdYears = [0], secondYears = [0], n00bs = [0];
		// const gensec = [];
		// const finalYears = [];
		// const n00bs = [];
		// const secondYears = [];
		// const thirdYears = [];

		this.state.club.push(this.state.thirdYears);
	}

	componentWillMount() {
		// this runs right before the <AddMembers /> is rendered

		this.ref = base.syncState(`/1-data`, {
			context: this,
			state: `club`, // add something here?
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	addMember(member) {

		console.log(member);

		switch (member.year) {
			case `gensec`:
				this.gensec = [...this.gensec].push(member)
				break;
			case `finalYear`:
				this.finalYears = [...this.finalYears].push(member)
				break;
			case `thirdYear`:
				this.setState({
					thirdYears: [...this.state.thirdYears, member]
				})
				console.log(this.state.thirdYears);
				break;
			case `secondYear`:
				this.secondYears = [...this.secondYears].push(member)
				break;
			case `n00b`:
				this.n00bs = [...this.n00bs].push(member)
				break;
			
			default:
				throw alert("something is reeeeeeally wrong")
				// break;
				
		}

		let yearWise = {...this.state.club}
		yearWise[`${member.year}`].push(this.state.thirdYears);

		this.setState({ club: yearWise})

		// this.setState({
		// 	club: [...this.state.club, member]
		// });

		// console.log(this.state.club);
		console.log(this.n00bs);
		console.log(this.secondYears);
		console.log(this.thirdYears);
		console.log(this.finalYears);
		console.log(this.gensec);

		
	}

	createMember(event) {
		event.preventDefault();
		// this.componentWillMount();

		const member = {
			name: this.name.value,
			quote: this.quote.value,
			year: this.year.value,
		};

		this.addMember(member);

		// console.log(member);
		// console.log(this.state.year);
	}

	render() {
		return (
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
					<option value="n00b">n00b</option>
					<option value="secondYear">secondYear</option>
					<option value="thirdYear">thirdYear</option>
					<option value="finalYear">finalYear</option>
					<option value="gensec">Gensec</option>
				</select>
				<button type="submit">Submit this!</button>
			</form>
		);
	}
}

export default AddMembers;