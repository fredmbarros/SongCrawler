import { useState } from "react";
import styled from "styled-components";

// NavBar2 looks like NavBar, but its mechanics are different, as it has nothing to do with params and the URL. There's a NavBarAdaptive file that I started coding in case down the line I decide to have just one single NavBar component that is valid for all situations and renders the routes accordingly

const NavBar2 = ({ setRoute }) => {
	const [isActive, setIsActive] = useState();
	const handleClick = (currentRoute) => {
		setRoute(currentRoute);
	};
	return (
		<Wrapper>
			<Button
				className={isActive ? "Wrapper" : null}
				onClick={() => handleClick("song_constellation")}>
				Constellation
			</Button>
			<Button
				className={isActive ? "Wrapper" : null}
				onClick={() => handleClick("song_details")}>
				Song Details
			</Button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: transparent;
	display: flex;
	padding: 20px 20px;
	position: absolute;
	width: auto;
	margin: auto;
	gap: 20px;
	font-size: 18px;
	Button {
		text-decoration: none;
		color: var(--color-greyedOutText);
		transition: font-size 0.4s;
		&:active {
			color: var(--color-regularText);
			font-size: 30px;
			transition: font-size 0.4s;
		}
	}
`;
const Button = styled.button`
	text-decoration: none;
	font-size: 14px;
	// margin: 22px 12px 0 0;
	border: none;
	background-color: transparent;
	// color: var(--color-functionalGreen);
	cursor: pointer;
`;

export default NavBar2;