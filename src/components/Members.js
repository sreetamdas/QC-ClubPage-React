import React from "react";

class Members extends React.Component {
	render_member(member, key) {
		let local_image = false,
			font_size_name =
				typeof member.name === "undefined"
					? "25px"
					: member.name.length >= "15" ? "34px" : "36px",
			image_id =
				typeof member.image === "undefined"
					? "https://drive.google.com/open?id=1QwSSN4kXEERbydtgpomfuqw9-RSw4PfH" // Kasala is default image obviously
					: member.image.substring(0, 5) === "/img/"
						? (local_image = true)
						: `https://drive.google.com/uc?export=view&id=${new URL(
								member.image,
							).searchParams.get("id")}`;

		const nameStyle = {
				fontSize: font_size_name,
			},
			nameClasses = "josefinSlab noUnderline white-text",
			quoteStyle = {
				fontSize: "18px",
				fontWeight: "600",
				paddingTop: 0,
			},
			quoteClasses = "Roboto orange";
		return (
			<div className="col-lg-3 col-md-12 col-sm-12 text-center" key={key}>
				<img
					src={
						local_image
							? process.env.PUBLIC_URL + member.image
							: image_id
					}
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
						<div
							className="row justify-content-center"
							style={{ padding: "0 50px" }}
						>
							{Object.keys(member_list).map(key =>
								this.render_member(member_list[key], key),
							)}
						</div>
						<hr
							className="primary"
							style={{ paddingBottom: "50px" }}
						/>
					</div>
				) : (
					<h3>Nothing yet</h3>
				)}
			</div>
		);
	}
}

export default Members;
