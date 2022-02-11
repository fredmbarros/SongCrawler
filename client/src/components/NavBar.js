import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
	// variable to set the order of the elements in the navbar so that they can change places according to which one is selected in the AdaptNavBar function - still have to figure out how to actually do this without resorting to conditional rendering of three different return statements
	// let navBarOrder = [];

	// const AdaptNavBar = (whoIsActive) => {
	// 	// not sure if navBarOrder should be an array and pass the values as strings - leave it for later
	// 	switch (whoIsActive) {
	// 		case "searchSong":
	// 			// console.log(whoIsActive);
	// 			navBarOrder = [
	// 				"#search(order:1)",
	// 				"#weekly(order:2)",
	// 				"#game(order:3)",
	// 			];
	// 			break;
	// 		case "weekly":
	// 			// console.log(whoIsActive);
	// 			navBarOrder = [
	// 				"#search(order:3)",
	// 				"#weekly(order:1)",
	// 				"#game(order:2)",
	// 			];
	// 			break;
	// 		case "game":
	// 			// console.log(whoIsActive);
	// 			navBarOrder = [
	// 				"#search(order:2)",
	// 				"#weekly(order:3)",
	// 				"#game(order:1)",
	// 			];
	// 			break;
	// 	}
	// };

	return (
		<Wrapper>
			<NavLink
				to="/search"
				exact
				// id="search"
				// className={(isActive) => {
				// 	isActive.isActive && AdaptNavBar("searchSong");
				// 	return "nav-link" + (isActive.isActive ? " active" : "");
				// }}
			>
				Search song
			</NavLink>
			<NavLink
				to="/weekly"
				exact
				// id="weekly"
				// className={(isActive) => {
				// 	isActive.isActive && AdaptNavBar("weekly");
				// 	return "nav-link" + (isActive.isActive ? " active" : "");
				// }}
			>
				Weekly playlist
			</NavLink>
			<NavLink
				to="/game"
				exact
				// id="game"
				// className={(isActive) => {
				// 	isActive.isActive && AdaptNavBar("game");
				// 	return "nav-link" + (isActive.isActive ? " active" : "");
				// }}
			>
				Game
			</NavLink>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: transparent;
	// background-color: blue;
	display: flex;
	padding: 20px 20px;
	position: absolute;
	right: 20px;
	gap: 20px;
	font-size: 18px;
	a {
		text-decoration: none;
		color: var(--color-greyedOutText);
		transition: font-size 0.4s;
		&.active {
			color: var(--color-regularText);
			font-size: 30px;
			transition: font-size 0.4s;
		}
	}
`;

export default NavBar;
