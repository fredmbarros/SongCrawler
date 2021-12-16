import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "./SearchContext";
import styled from "styled-components";
import Header from "./Header";
import Searchbox from "./Searchbox";

const Start = () => {
	const { category, user } = useContext(SearchContext);

	// let navigate = useNavigate();

	// useEffect(() => {
	// 	if (user) {
	// 		navigate("/");
	// 	}
	// }, []);

	// randomly choose text to accompany the searchBox in Start
	const [greeting, setGreeting] = useState();
	const chooseGreeting = () => {
		let greetingsArr = [
			`Go ahead, search for that ${category}`,
			`Scratch that itch, search for the ${category}`,
			`I know you want it, look up that ${category}`,
			`Give in, pursue that ${category}`,
			`That ${category} in your head, look it up here`,
			`Got that itch for music? Hunt that ${category} here`,
			`Wouldn't you like to know a bit more about that ${category}?`,
			`Type in here whatever ${category} that catches your fancy`,
			`Shazam'd some interesting ${category}? Type it here`,
			`Want to know more about that ${category}?`,
		];
		let index = Math.floor(Math.random() * 10);
		setGreeting(greetingsArr[index]);
	};
	useEffect(() => {
		chooseGreeting();
	}, [category]);

	return (
		<Wrapper>
			<SearchElement>
				<Form>
					<p>{greeting}</p>
					<Searchbox />
				</Form>
			</SearchElement>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: #68696e;
	padding: 20px;
`;
const SearchElement = styled.div`
	width: 100vw;
	height: 100vh;
`;
const HackDiv = styled.div`
	position: relative;
	z-index: 100;
	height: 40px;
	width: 160px;
	background-color: #68696e;
	border: solid red 10px;
`;

const Form = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 30vh 0;
`;

export default Start;
