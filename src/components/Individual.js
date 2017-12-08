import React from 'react';

const Individual = (props) => {
	return(
       	<p className="americanCaptain noUnderline">
			<a style={props.nameStyle}>{props.using.name}</a>
			<br />
			<span className="precursive" style={props.quoteStyle}>{props.using.quote}</span>
		</p>
	)
}

export default Individual;