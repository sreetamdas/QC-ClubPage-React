import React from "react";
import Loader from "./Loader";
import QCNavbar from "./QCNavbar";

const Test = () => (
	<React.Fragment>
		<QCNavbar />
		<Loader message="Test page lol" />
	</React.Fragment>
);

export default Test;