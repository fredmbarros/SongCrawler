import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "./SearchContext";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Header from "./Header";
import Start from "./Start";
import Main from "./lixo/Main";
import SearchResults from "./SearchResults";
import SecondHeader from "./SecondHeader";
import Searchbox from "./Searchbox";

const Home = () => {
	const {
		renderOnHome,
		rawSearchResults,
		searchTerm,
		setSearchTerm,
		song,
		setSong,
		artist,
		setArtist,
		album,
		setAlbum,
		category,
		setCategory,
	} = useContext(SearchContext);
	const { user, isAuthenticated, isLoading } = useAuth0();

	// primeiro procurar no meu BE, se não tiver a info lá, buscar no Genius...
	// ...na verdade, cada busca tem que ser feita nos dois, porque pode ter coisa nova no Genius
	let navigate = useNavigate();

	// checking if there's been a previous session saved in localStorage. If there is, render it in Songs like a regular search, else go to Start. Not working: dosen't navigate, considers checkPrevSession always true, if I insert getItem straight into the if cond I get a loop in re-renders

	// loading state
	const [status, setStatus] = useState(null);

	// randomly choose text to accompany the searchBox in Start
	const [greeting, setGreeting] = useState();
	const chooseGreeting = () => {
		let greetingsArr = [
			`Go ahead, search for that song that's playing in your head`,
			`Scratch that itch, search for the song`,
			`I know you want it, look up that song`,
			`Give in, pursue that song`,
			`That song in your head, look it up here`,
			`Got that itch for music? Hunt a song here`,
			`Wouldn't you like to know a little more about that song?`,
			`Type in here whatever song that catches your fancy`,
			`Shazam'd a nice song? Type its name here!`,
			`Want to know more about that song you overheard at the grocery store?`,
		];
		let index = Math.floor(Math.random() * 10);
		setGreeting(greetingsArr[index]);
	};
	useEffect(() => {
		chooseGreeting();
	}, []);

	return (
		<Wrapper>
			<SearchElement>
				<Form>
					<DIV></DIV>
					<p>{greeting}</p>
					<BoxDiv>
						<Searchbox />
					</BoxDiv>
				</Form>
			</SearchElement>
		</Wrapper>
	);
};

const Wrapper = styled.div``;
const SearchElement = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: lightgrey;
	/* background-image: url("./assets/fender-tweed.jpg"); */
`;
const Form = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 30vh 0;
`;
const DIV = styled.div`
	width: 248px;
	height: 12px;
	border: solid #1f2124 10px;
	position: absolute;
	z-index: 100;
	top: 7.8vh;
	left: 75vw;
	background-color: #1f2124;
`;
const BoxDiv = styled.div`
	padding: 6px 10px;
	background-color: #1f2124;
	border-radius: 5px;
`;
const Tabs = styled.div`
	display: flex;
`;
const Tab = styled.button`
	margin: 10px;
`;
const CategHead = styled.button``;

export default Home;
