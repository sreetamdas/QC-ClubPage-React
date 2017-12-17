import React from "react";

class NotFound extends React.Component {
	render() {
		const styles_404 = {
				fontSize: "15vh",
			};
			// styles_message = {
			// 	color: 
			// }
		return (
			<div className="full-page">
				<h1
					className="white-text vertical-center josefinSlab"
					style={styles_404}
				>
					Error 404!
					<br/>
					<span style={{ fontSize: "6vh"}}>The page you are looking for does not exist :(</span>
				</h1>
			</div>
		);
	}
}

export default NotFound;
