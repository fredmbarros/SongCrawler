import { useState, useEffect } from "react";
import styled from "styled-components";

import NavBar2 from "./NavBar2";
import SongConstellation from "./SongConstellation";
import SongDetails from "./SongDetails";

const SongInfoBoard = ({ song, geniusData }) => {
	const [route, setRoute] = useState();

	return (
		<Wrapper>
			<NavBar2S setRoute={setRoute} />
			{route === "song_constellation" ? (
				<SongConstellation song={song} />
			) : (
				<SongDetails data={geniusData} />
			)}
		</Wrapper>
	);
};

const NavBar2S = styled(NavBar2)`
	position: absolute;
	width: auto;
	margin: auto;
	border: green solid 1px;
`;

const Wrapper = styled.div`
	position: relative;
	padding: 10px 0 0 0;
	> NavBar2S {
		border: green solid 1px;
	}
`;
export default SongInfoBoard;
