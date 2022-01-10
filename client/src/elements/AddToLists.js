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
	const { userId, username } = useContext(SearchContext);
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [showNoteEntryBox, setShowNoteEntryBox] = useState(false);

	const saveSong = () => {
		if (username && isAuthenticated) {
			fetch("/users/songs", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId, songId }),
			});
		}
		setSongInUser(true);
	};

	const deleteSong = () => {
		if (username) {
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
		// FORGET WHAT'S BELOW - THIS JUST TAKES TO THE CONSTELLATION CREATION PAGE WHERE THE CRITERIA IS SHOWN AND CAN BE SELECTED ALONG WITH THE NEED TO INDICATE OTHER SONGS
		// This one is complex. Ideally, it would consider (at least) four possible basic links between two songs - beat, harmony, melody, and timbre - and create a graphic where songs floating around have color-coded lines connecting them according to those links (ideally, these links should be (and be represented as) stronger or weaker, depending on the degree of affinity). For now, let's just show some dummy constellations created arbitrarily and allow the user to add/remove the song to/from them.
	};

	return (
		<Wrapper>
			{isAuthenticated ? (
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
					<Button onClick={addToConstellation}>Constellate</Button>
				</Wrapper>
			) : (
				<WrapperGreyedOutBtns>
					<UserFiles>
						<GreyedOutButton>Save song</GreyedOutButton>

						<GreyedOutButton>Write notes</GreyedOutButton>
					</UserFiles>
					<GreyedOutButton>Constellate</GreyedOutButton>
					<SuggestLogin>Please login</SuggestLogin>
				</WrapperGreyedOutBtns>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: block;
	position: relative;
`;
const UserFiles = styled.div`
	display: flex;
`;
const Button = styled.button`
	background-color: white;
	border: 1px lightgrey solid;
	cursor: pointer;
	margin: 8px;
	border-radius: 5px;
	padding: 2px 6px;
	font-family: arial;
	font-size: 16px;
	position: relative;
	&:hover {
		bottom: 1px;
		filter: drop-shadow(0 0 8px #bababa);
	}
	&:active {
		bottom: -1px;
	}
`;
const WrapperGreyedOutBtns = styled.div`
	display: block;
`;
const GreyedOutButton = styled.span`
	background-color: white;
	border: 1px lightgrey solid;
	color: lightgrey;
	cursor: default;
	margin: 8px;
	border-radius: 5px;
	padding: 2px 6px;
	font-family: arial;
	font-size: 16px;
`;
const SuggestLogin = styled.span`
	position: absolute;
	display: none;
	top: 10px;
	left: 20px;
	${WrapperGreyedOutBtns}:hover & {
		display: block;
		color: white;
		background-color: black;
		border-radius: 10%;
		padding: 4px 6px;
		box-shadow: 0px 4px 12px black;
	}
`;
export default AddToLists;
