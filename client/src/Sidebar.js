import { useState, useContext } from "react";
import { SearchContext } from "./SearchContext";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Sidebar = () => {
	const {
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
		renderCategory,
	} = useContext(SearchContext);

	// loading state
	const [status, setStatus] = useState(null);

	let navigate = useNavigate();

	return (
		// <Wrapper>
		<Bar>
			<SidebarElem
				onClick={() => {
					navigate("/saved-songs");
				}}>
				Saved songs
			</SidebarElem>
			{/* <SidebarElem
				onClick={() => {
					setCategory("list");
					setAlbum("");
					navigate("/lists");
				}}>
				Lists
			</SidebarElem> */}
			<SidebarElem
				onClick={() => {
					setCategory("artist");
					setArtist("");
					navigate("/artist");
				}}>
				Notes
			</SidebarElem>
			<SidebarElem
				onClick={() => {
					setCategory("album");
					setAlbum("");
					navigate("/artist");
				}}>
				Constellations
			</SidebarElem>
		</Bar>
		// </Wrapper>
	);
};

const Bar = styled.div`
	display: flex;
	flex-direction: row;
	background-color: #1f2124;
	padding: 0px 10px 0 10px;
	/* width: 227px; */
	width: 100%;
	border: solid #1f2124 2px;
`;
const P = styled.p`
	margin: 4px 0;
`;
const SidebarElem = styled.button`
	text-align: left;
	border: none;
	color: white;
	background-color: #1f2124;
	margin: 0 20px;
	cursor: pointer;
	position: relative;
	z-index: 0;

	&:hover {
		/* filter: drop-shadow(0 0 6px #68696e); */
		bottom: 1px;
	}
`;
export default Sidebar;
