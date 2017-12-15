import React from "react";
// import Individual from './Individual';

class Members extends React.Component {
	render() {
		var nameStyle = {
			fontSize: "3em",
		};

		var quoteStyle = {
			fontSize: "0.7em",
			paddingTop: 0,
		};

		const { details } = this.props;
		console.log(details);

		const empty = details.length === 0 ? true : false;

		console.log(empty);
		// console.log(JSON.stringify(this.props.details));
		// https://drive.google.com/open?id=1oN1EbU9Y1-2Xpsjwv0ieFONqDXyTMoVp
		// https://avatars3.githubusercontent.com/u/11270438?s=400&u=1664aa962a38ed0ae257b153dffb37891581c80a&v=4

		const image_url_string = new URL(
				"https://drive.google.com/open?id=1oN1EbU9Y1-2Xpsjwv0ieFONqDXyTMoVp",
			),
			image_id = image_url_string.searchParams.get("id");

		return (
			<div>
				{!empty ? (
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-12 text-center">
								<img
									src={`https://drive.google.com/uc?export=view&id=${image_id}`}
									height="200px"
									className="rounded-circle"
									alt={details.name}
								/>
								<p className="americanCaptain noUnderline">
									<a style={nameStyle}>{details.name}</a>
									<br />
									<span
										className="precursive"
										style={quoteStyle}
									>
										{details.quote}
									</span>
								</p>
							</div>
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
