import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "./SearchContext";
import styled from "styled-components";
import Header from "./Header";
import Start from "./Start";
import Main from "./lixo/Main";
import SearchResults from "./SearchResults";

const Home = () => {
	const {
		user,
		setUser,
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
	// primeiro procurar no meu BE, se não tiver a info lá, buscar no Genius...
	// ...na verdade, cada busca tem que ser feita nos dois, porque pode ter coisa nova no Genius
	let navigate = useNavigate();

	// checking if there's been a previous session saved in localStorage. If there is, render it in Songs like a regular search, else go to Start. Not working: dosen't navigate, considers checkPrevSession always true, if I insert getItem straight into the if cond I get a loop in re-renders
	let checkPrevSession = localStorage.getItem("songId");
	useEffect(() => {
		if (!user) {
			navigate("/start");
		}
	}, []);

	// useEffect(() => {
	// 	if (checkPrevSession) {
	// 		navigate("/start");
	// 	} else {
	// 		navigate("/songs");
	// 	}
	// }, []);

	// loading state
	const [status, setStatus] = useState(null);
	return (
		<Wrapper>
			<Head>
				<h1>Foto</h1>
				<h1>Song title</h1>
				<h1>Artist</h1>
			</Head>
			<Tabs>
				<Tab
					onClick={() => {
						setCategory("list");
						navigate("/lists");
					}}>
					Lists
				</Tab>
				<Tab
					onClick={() => {
						setCategory("artist");
						navigate("/artist");
					}}>
					Artist
				</Tab>
				<Tab
					onClick={() => {
						setCategory("song");
						navigate("/songs");
					}}>
					Album
				</Tab>
				<Tab
					onClick={() => {
						setCategory("song");
						navigate("/songs");
					}}>
					Trivia
				</Tab>
			</Tabs>
			<DIV></DIV>
			<Tabs>
				<Tab
					onClick={() => {
						setCategory("artist");
						navigate("/artist");
					}}>
					Sing it
				</Tab>
				<Tab
					onClick={() => {
						setCategory("song");
						navigate("/songs");
					}}>
					Play it
				</Tab>
			</Tabs>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: lightblue;
	width: 100%;
	height: 100vh;
`;
const Head = styled.div`
	display: flex;
`;
const Tabs = styled.div`
	display: flex;
`;
const Tab = styled.button`
	margin: 10px;
`;
const CategHead = styled.button``;

const DIV = styled.div`
	border-bottom: solid black 1px;
	margin: 0 10px;
`;
export default Home;
