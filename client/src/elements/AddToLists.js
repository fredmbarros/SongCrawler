import { useState, useParams, useContext } from "react";
import { SearchContext } from "../SearchContext";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import NoteEntryBox from "./NoteEntryBox";

const AddToLists = ({
	songId,
	songTitle,
	artist,
	songInUser,
	setSongInUser,
}) => {
	const { userId } = useContext(SearchContext);
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [showNoteEntryBox, setShowNoteEntryBox] = useState(false);
	const saveSong = () => {
		if (user) {
			fetch("/users/songs", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId: user.email, songId }),
			});
		}
		setSongInUser(true);
	};

	const deleteSong = () => {
		if (user) {
			fetch("/users/songs", {
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId: user.email, songId }),
			});
		}
		setSongInUser(false);
	};

	const writeNotes = () => {
		// **if** is part of saved songs
		setShowNoteEntryBox(true);
		saveSong();
	};

	const addToConstellation = () => {
		// This one is complex. Ideally, it would consider (at least) four possible basic links between two songs - beat, harmony, melody, and timbre - and create a graphic where songs floating around have color-coded lines connecting them according to those links (ideally, these links should be (and be represented as) stronger or weaker, depending on the degree of affinity). For now, let's just show some dummy constellations created arbitrarily and allow the user to add/remove the song to/from them.
	};

	return (
		<Wrapper>
			<UserFiles>
				{songInUser ? (
					<Button
						onClick={() => {
							deleteSong();
						}}>
						Remove song
					</Button>
				) : (
					<Button
						onClick={() => {
							saveSong();
						}}>
						Save song
					</Button>
				)}
				<Button onClick={writeNotes}>Write notes</Button>
				{showNoteEntryBox && (
					<NoteEntryBox setShowNoteEntryBox={setShowNoteEntryBox} />
				)}
			</UserFiles>
			<Button onClick={addToConstellation}>Add to constellation</Button>
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
	position: relative;
	&:hover {
		bottom: 1px;
		filter: drop-shadow(0 0 8px #bababa);
	}
	&:active {
		bottom: -1px;
	}
`;
export default AddToLists;
