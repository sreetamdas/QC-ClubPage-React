import React from 'react';
import Individual from './Individual';

class Members extends React.Component {
	render() {

		var nameStyle = {
			fontSize: '3em'
		}

		var quoteStyle = {
			fontSize: '0.7em',
			paddingTop: 0
		}

		const {details} = this.props;

		// console.log(JSON.stringify(this.props.details));

		return(
			<div>
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-12 text-center">
							<img src="https://avatars3.githubusercontent.com/u/11270438?s=400&u=1664aa962a38ed0ae257b153dffb37891581c80a&v=4" height="200px" className="rounded-circle" alt="Sreetam Das" />
							<p className="americanCaptain noUnderline">
								<a style={nameStyle}>
									{details.name}
								</a>
								<br />
								<span className="precursive" style={quoteStyle}>
									{details.quote}
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Members;
