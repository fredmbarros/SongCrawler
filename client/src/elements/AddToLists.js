import { useState, useParams, useContext } from "react";
import { SearchContext } from "../SearchContext";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import NotesBox from "./NotesBox";

const AddToLists = ({ songId, songTitle, artist }) => {
	const { userId } = useContext(SearchContext);
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [showNotesBox, setShowNotesBox] = useState(false);
	let savedSong = {};
	let isSaved = false;
	const SaveSong = () => {
		let addToSavedSong = {
			userId,
			songId,
			// isSaved: "true",
			notes: [],
			constellations: [],
		};
		savedSong = { ...savedSong, ...addToSavedSong };
		console.log(savedSong);
	};

	const WriteNotes = () => {
		// **if** is part of saved songs
		setShowNotesBox(true);
		SaveSong();
		savedSong.notes.push();
	};

	const AddToConstellation = () => {
		// This one is complex. Ideally, it would consider (at least) four possible basic links between two songs - beat, harmony, melody, and timbre - and create a graphic where songs floating around have color-coded lines connecting them according to those links (ideally, these links should be (and be represented as) stronger or weaker, depending on the degree of affinity). For now, let's just show some dummy constellations created arbitrarily and allow the user to add/remove the song to/from them.
	};

	return (
		<Wrapper>
			<UserFiles>
				<Button
					onClick={() => {
						SaveSong();
					}}>
					{isSaved ? <p>Saved</p> : <p>Save Song</p>}
				</Button>
				<Button onClick={WriteNotes}>Write notes</Button>
				{showNotesBox && <NotesBox setShowNotesBox={setShowNotesBox} />}
			</UserFiles>
			<Button onClick={AddToConstellation}>Add to constellation</Button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: block;
`;
const UserFiles = styled.div`
	display: flex;
`;
const Button = styled.button`
	background-color: white;
	border: none;
	cursor: pointer;
	margin: 8px;
	border-radius: 5px;
	padding: 0px 6px;
`;
export default AddToLists;
