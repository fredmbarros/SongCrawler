// NOT CURRENTLY IN USE - LEAVING IT HERE SO THAT MAYBE, IF I DECIDE TO MESS WITH IT AND CREATE A SINGLE NAVBAR THAT ADAPTS TO DIFFERENT SITUATIONS, I ALREADY HAVE PART OF THE CODE

import { useState } from "react";
import styled from "styled-components";

const NavBar2 = ({ setRoute, list }) => {
	return (
		<Wrapper>
			{list.map((item, index) => {
				return (
					<Button
						key={index}
						onClick={() => setRoute(item.toLowerCase().replace(/\s/g, "_"))}
						// if item === route, set larger font (props to CSS)
					>
						{item}
					</Button>
				);
			})}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: transparent;
	background-color: blue;
	display: flex;
	padding: 20px 20px;
	position: absolute;
	width: auto;
	margin: auto;
	gap: 20px;
	font-size: 18px;
	// a {
	// 	text-decoration: none;
	// 	color: var(--color-greyedOutText);
	// 	transition: font-size 0.4s;
	// 	&.active {
	// 		color: var(--color-regularText);
	// 		font-size: 30px;
	// 		transition: font-size 0.4s;
	// 	}
	}
`;
const Button = styled.button`
	text-decoration: none;
	// font-size: 14px;
	// margin: 22px 12px 0 0;
	border: none;
	background-color: transparent;
	// color: var(--color-functionalGreen);
	cursor: pointer;
`;

export default NavBar2;
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
