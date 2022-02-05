import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Header from "./Header";
import Home from "./Home";
import SearchResults from "./SearchResults";
import Start from "./Start";
import SecondHeader from "./SecondHeader";
import GlobalStyles from "./GlobalStyles";

import List from "./elements/List";
import Song from "./elements/Songs";

import Lists from "./categories/Lists";
import Notes from "./categories/Notes";
import Songs from "./categories/SavedSongs";
import Contribute from "./Contribute";

const App = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	return (
		<>
			<GlobalStyles />
			<Router>
				<Header />
				<Wrapper>
					<SecondHeader />
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

const Wrapper = styled.div`
	/* display: flex; */
`;
export default App;
