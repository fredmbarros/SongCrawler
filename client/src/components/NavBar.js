import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
	return (
		<Wrapper>
			<NavLink
				to="/search"
				exact
				className={(isActive) => "nav-link" + (!isActive && " inactive")}>
				Search song
			</NavLink>
			<NavLink
				to="/weekly"
				exact
				className={(isActive) => "nav-link" + (!isActive ? " inactive" : "")}>
				Weekly playlist
			</NavLink>
			<NavLink
				to="/game"
				exact
				className={(isActive) => "nav-link" + (!isActive ? " inactive" : "")}>
				Game
			</NavLink>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: transparent;
	display: flex;
	padding: 20px 20px;
	position: absolute;
	right: 0;
	gap: 20px;
	font-size: 18px;
	a {
		text-decoration: none;
	}
	.nav-link {
		color: var(--color-regularText);
		// font-size: 30px;
		& .inactive {
			// color: var(--color-greyedOutText);
			color: black;
		}
	}
`;

export default NavBar;
