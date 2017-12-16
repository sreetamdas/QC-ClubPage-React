import React from "react";
// import Individual from './Individual';

class Members extends React.Component {
	render_member(member, key) {
		const nameStyle = {
			fontSize: "3em",
			color: "black",
			// fontWeight: 700,
		},
			quoteStyle = {
			fontSize: "1.7em",
			paddingTop: 0,
			color: "black",
			// fontWeight: 700,
		};	
		console.log(nameStyle);
		let image_url_string = new URL(member.image),
			image_id = image_url_string.searchParams.get("id");

		return (
			<div className="col-lg-4 text-center" key={key}>
				<img
					src={`https://drive.google.com/uc?export=view&id=${image_id}`}
					height="200px"
					className="rounded-circle"
					alt={member.name}
				/>
				<p className="americanCaptain noUnderline">
					<a style={nameStyle}>{member.name}</a>
					<br />
					<span className="precursive" style={quoteStyle}>
						{member.quote}
					</span>
				</p>
			</div>
		);
	}

	render() {
		const member_list = this.props.list;
		// console.log(details);

		const empty = member_list.length === 0 ? true : false;

		// console.log(empty);
		// console.log(JSON.stringify(this.props.details));
		// https://drive.google.com/open?id=1oN1EbU9Y1-2Xpsjwv0ieFONqDXyTMoVp
		// https://avatars3.githubusercontent.com/u/11270438?s=400&u=1664aa962a38ed0ae257b153dffb37891581c80a&v=4

		return (
			<div>
				{!empty ? (
					<div className="container-fluid">
						<div className="row">
						{/* {console.log(member_list)} */}
						{/* {console.log("member list: ", member_list)} */}
							{Object.keys(member_list).map(key => (
								this.render_member(member_list[key], key)
							))}
						</div>
					</div>
				) : (
					<div>Nothing yet</div>
				)}
			</div>
		);
	}
}

export default Members;
