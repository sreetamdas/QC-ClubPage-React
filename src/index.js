// let's go!
import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter, Match, Miss } from 'react-router';
import Home from './components/Home';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';



const Root = () => {
	return (
		<div>
			<Home />
		</div>
	)
}

render(<Root />, document.getElementById("root"));