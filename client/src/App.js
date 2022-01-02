import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Header from "./Header";
import Home from "./Home";
import SearchResults from "./SearchResults";
import Searchbox from "./Searchbox";
import Sidebar from "./Sidebar";
import { SearchContext } from "./SearchContext";
import Start from "./Start";

import Album from "./elements/Album";
import Artist from "./elements/Artist";
import List from "./elements/List";
import Song from "./elements/Songs";

import Albums from "./categories/Albums";
import Artists from "./categories/Artists";
import Lists from "./categories/Lists";
import Notes from "./categories/Notes";
import Songs from "./categories/SavedSongs";
import Contribute from "./Contribute";

const App = () => {
	const { renderOnHome, rawSearchResults } = useContext(SearchContext);
	const { user, isAuthenticated, isLoading } = useAuth0();

	return (
		<>
			<GlobalStyles />
			<Router>
				<Header />
				<Wrapper>
					<SecondHeader>
						<Sidebar />
						<Searchbox />
					</SecondHeader>
					<Routes>
						<Route exact path="/home" element={<Home />} />
						<Route exact path="/" element={<Start />} />
						<Route path="/results" element={<SearchResults />} />
						<Route path="/list" element={<List />} />
						<Route path="/lists" element={<Lists />} />
						<Route path="/notes" element={<Notes />} />
						<Route path="/songs/:songId" element={<Song />} />
						<Route path="/songs" element={<Songs />} />
						<Route path="/contribute" element={<Contribute />} />
					</Routes>
				</Wrapper>
			</Router>
		</>
	);
};

const GlobalStyles = styled.div`
	// to be imported
`;
const Wrapper = styled.div`
	/* display: flex; */
`;
const SecondHeader = styled.div`
	display: flex;
	box-shadow: 0 2px 12px 1px #3e4042;
	position: relative;
	z-index: 2;
`;
export default App;
