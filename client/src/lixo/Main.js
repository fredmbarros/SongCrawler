import { useState, useContext } from "react";
import { SearchContext } from "../SearchContext";
import styled from "styled-components";
import Searchbox from "../Searchbox";

const Main = () => {
	const { searchTerm, setSearchTerm, song, artist, album, category } =
		useContext(SearchContext);

	// loading state
	const [status, setStatus] = useState(null);
	return (
		<>
			<p>Main</p>
		</>
	);
};

export default Main;
