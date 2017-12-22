import React from "react";

class Members extends React.Component {
	render_member(member, key) {
		const nameStyle = {
				fontSize: "3em",
			},
			nameClasses = "josefinSlab noUnderline white-text",
			quoteStyle = {
				fontSize: "1.7em",
				paddingTop: 0,
			},
			quoteClasses = "josefinSlab orange";
		console.log("original:", member.image);
		// console.log(process.env.PUBLIC_URL);
		let local_image = false,
			image_id =
				typeof member.image === "undefined"
					? "https://drive.google.com/open?id=1QwSSN4kXEERbydtgpomfuqw9-RSw4PfH" // Kasala is default image obviously
					: member.image.substring(0, 5) === "/img/"
						? local_image = true
						: `https://drive.google.com/uc?export=view&id=${new URL(
								member.image,
							).searchParams.get("id")}`;
		console.log("imageid:", image_id);
		return (
			<div className="col text-center" key={key}>
				<img
					src={local_image ? process.env.PUBLIC_URL + member.image : image_id}
					height="200px"
					className="rounded-circle"
					alt={member.name}
				/>
				<p>
					<a style={nameStyle} className={nameClasses}>
						{member.name}
					</a>
					<br />
					<span className={quoteClasses} style={quoteStyle}>
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
							{Object.keys(member_list).map(key =>
								this.render_member(member_list[key], key),
							)}
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
