import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
	faCoffee,
	faHeart,
	faCode,
	faPhone,
	faEnvelope,
	faRss,
} from "@fortawesome/fontawesome-free-solid";

const Footer = () => (
	<section>
		<div className="row josefinSlab fa-icons">
			<div
				className="col-lg-12 text-center"
				style={{ paddingBottom: "40px" }}
			>
				<h2
					className="section-heading ailerons"
					style={{ fontSize: "40px" }}
				>
					Let's Get In Touch!
				</h2>
				<p className="orange" style={{ fontSize: "30px" }}>
					Do you even pounce?
				</p>
				<hr className="primary" />
			</div>
			<div className="col-lg-2 offset-lg-2 text-center">
				<FontAwesomeIcon
					icon={faPhone}
					className="fa-3x"
					flip="horizontal"
				/>
				<p style={{ fontSize: "28px", fontWeight: "500" }}>
					+91 9701 832 369
				</p>
			</div>
			<div className="col-lg-4 text-center noUnderline">
				<a href="https://www.facebook.com/qcnitw">
					<FontAwesomeIcon icon={faRss} className="fa-3x" />
					<p style={{ fontSize: "28px", fontWeight: "500" }}>
						Follow us for Updates!
					</p>
				</a>
			</div>
			<div className="col-lg-2 text-center noUnderline">
				<a href="mailto:quizclub@student.nitw.ac.in">
					<FontAwesomeIcon icon={faEnvelope} className="fa-3x" />
					<p style={{ fontSize: "28px", fontWeight: "500" }}>
						Mail Us!
					</p>
				</a>
			</div>
		</div>
		<div
			className="row ailerons orange text-center"
			style={{ paddingTop: "100px" }}
		>
			<div
				style={{ borderRight: "3px solid", height: "40px" }}
				className="col-12"
			>
				<p style={{ fontSize: "28px" }} id="copyright">
					<a
						rel="license"
						href="http://creativecommons.org/licenses/by-nc/4.0/"
					>
						<img
							alt="Creative Commons License"
							style={{ borderWidth: 0 }}
							src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png"
						/>
					</a>{" "}
					Quiz Club, NIT Warangal
				</p>
			</div>
			<div className="col-12" style={{ paddingTop: "40px" }}>
				<p style={{ fontSize: "28px" }}>
					Made with{" "}
					<a href="">
						<FontAwesomeIcon icon={faHeart} />
					</a>
					, <FontAwesomeIcon icon={faCoffee} /> and{" "}
					<FontAwesomeIcon icon={faCode} /> by{" "}
					<a
						id="credits"
						href="https://bit.do/sreetamdas"
						style={{ border: "2px solid" }}
					>
						Sreetam Das
					</a>
				</p>
			</div>
		</div>
	</section>
);

export default Footer;
