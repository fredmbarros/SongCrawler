import { useState } from "react";
import styled from "styled-components";

// NavBar2 looks like NavBar, but its mechanics are different, as it has nothing to do with params and the URL. There's a NavBarAdaptive file that I started coding in case down the line I decide to have just one single NavBar component that is valid for all situations and renders the routes accordingly

const NavBar2 = ({ setRoute }) => {
	const [toggleActive, setToggleActive] = useState();
	const handleClick = (currentRoute) => {
		setRoute(currentRoute);
		setToggleActive(!toggleActive);
	};
	return (
		<Wrapper>
			<Button
				className={toggleActive ? "current" : ""}
				onClick={() => handleClick("song_constellation")}>
				Constellation
			</Button>
			<Button
				className={toggleActive ? "" : "current"}
				onClick={() => handleClick("song_details")}>
				Song Details
			</Button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: transparent;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	padding: 0px 50px 0px 20px;
	position: relative;
	gap: 20px;
	font-size: 16px;
	Button {
		text-decoration: none;
		color: var(--color-greyedOutText);
		transition: font-size 0.4s;
		&.current {
			color: var(--color-regularText);
			font-size: 22px;
			transition: font-size 0.4s;
		}
	}
`;
const Button = styled.button`
	text-decoration: none;
	border: none;
	background-color: transparent;
	cursor: pointer;
`;

export default NavBar2;
