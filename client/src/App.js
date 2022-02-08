import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Header from "./components/Header";
import SearchResults from "./SearchResults";
import Start from "./pages/Start";
import Weekly from "./pages/Weekly";
import Game from "./pages/Game";
import NavBar from "./components/NavBar";
import GlobalStyles from "./GlobalStyles";

const App = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	return (
		<>
			<GlobalStyles />
			<Router>
				<Header />
				<Wrapper>
					<NavBar />
					<Routes>
						<Route exact path="/search" element={<Start />} />
						<Route exact path="/weekly" element={<Weekly />} />
						<Route exact path="/game" element={<Game />} />
						<Route exact path="/results" element={<SearchResults />} />
					</Routes>
				</Wrapper>
			</Router>
		</>
	);
};

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background-image: linear-gradient(var(--color-BgGradientStart), black);
	background-size: cover;
	position: absolute;
	z-index: -1;
`;

export default App;
