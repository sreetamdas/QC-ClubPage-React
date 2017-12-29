// let's go!
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import "./css/bootstrap.min.css";
import "./css/styles.css";
import AddMembers from "./components/AddMembers";
import NotFound from "./components/NotFound";
import Oldies from "./components/Oldies";

const Root = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/add" component={AddMembers} />
				<Route exact path="/oldies" component={Oldies} />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
};

render(<Root />, document.getElementById("root"));
