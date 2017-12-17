import React from "react";
const loader_styles = {
	fontSize: "15vh",
};
const Loader = props => (
	<div className="full-page">
		<h1 className="white-text vertical-center josefinSlab" style={loader_styles}>
			{props.message}
		</h1>
	</div>
);

export default Loader;
