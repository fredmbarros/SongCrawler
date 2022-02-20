import { useState, useEffect } from "react";
import styled from "styled-components";

import NavBar2 from "./NavBar2";
import SongConstellation from "./SongConstellation";
import SongDetails from "./SongDetails";

const SongInfoBoard = ({ song, geniusData }) => {
	const [route, setRoute] = useState();

	return (
		<Wrapper>
			<NavBar2 setRoute={setRoute} />
			{route === "song_constellation" ? (
				<SongConstellation song={song} />
			) : (
				<SongDetails data={geniusData} />
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: relative;
`;

export default SongInfoBoard;
