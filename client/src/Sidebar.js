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
					setCategory("song");
					setSong("");
					navigate("/song");
				}}>
				Saved songs
			</SidebarElem>
			<SidebarElem
				onClick={() => {
					setCategory("list");
					setAlbum("");
					navigate("/lists");
				}}>
				Lists
			</SidebarElem>
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
	background-color: white;
	padding: 10px 10px 0 10px;
	/* width: 227px; */
	width: 100%;
	border: solid red 2px;
`;
const P = styled.p`
	margin: 4px 0;
`;
const SidebarElem = styled.button`
	text-align: left;
	border: none;
	border-bottom: solid black 1px;
	background-color: white;
	padding: 12px 0 4px 0;
	margin: 0 10px 0 0;

	&:hover {
		text-shadow: 0 1px grey;
	}
`;
export default Sidebar;
