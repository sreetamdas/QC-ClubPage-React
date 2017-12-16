import React from "react";

class Members extends React.Component {
	render_member(member, key) {
		const nameStyle = {
			fontSize: "3em",
			color: "black",
		},
			quoteStyle = {
			fontSize: "1.7em",
			paddingTop: 0,
			color: "black",
		};	
		let image_url_string = new URL(typeof member.image === "undefined"
										? "https://drive.google.com/open?id=1QwSSN4kXEERbydtgpomfuqw9-RSw4PfH" // Kasala is default image obviously
										: member.image),
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
		const empty = member_list.length === 0 ? true : false;

		return (
			<div>
				{!empty ? (
					<div className="container-fluid">
						<div className="row">
							{Object.keys(member_list).map(key => (
								this.render_member(member_list[key], key)
							))}
						</div>
					</div>
				) : (
					<h3>Nothing yet</h3>
				)}
			</div>
		);
	}
}

export default Members;
