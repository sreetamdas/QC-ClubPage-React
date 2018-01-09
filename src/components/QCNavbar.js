import React from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from "reactstrap";
import qc_logo from "../css/images/QC_Logo.png";
import { LinkContainer } from "react-router-bootstrap";

export default class QCNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
			dev: false,
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}
	render() {
		return (
			<div className="black-bg">
				<Navbar
					className="bg-transparent"
					light
					expand="md"
					fixed="top"
				>
					<LinkContainer
						to="/"
						style={{ padding: "0px", border: "0px" }}
					>
						<NavbarBrand>
							<img src={qc_logo} height="65px" alt="QC Logo" />
						</NavbarBrand>
					</LinkContainer>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<LinkContainer to="/oldies">
									<NavLink className="white-text josefinSlab nav-link-text">
										Oldies
									</NavLink>
								</LinkContainer>
							</NavItem>
							{this.state.dev ? (
								<React.Fragment>
									<NavItem>
										<LinkContainer to="/test">
											<NavLink className="white-text josefinSlab nav-link-text">
												Test
											</NavLink>
										</LinkContainer>
									</NavItem>
									<NavItem>
										<LinkContainer to="/add">
											<NavLink className="white-text josefinSlab nav-link-text">
												Add
											</NavLink>
										</LinkContainer>
									</NavItem>
								</React.Fragment>
							) : null}
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}
