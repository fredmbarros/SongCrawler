import { useState, useParams, useContext } from "react";
import { SearchContext } from "../SearchContext";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { BsVinylFill } from "react-icons/bs";

const SaveSong = ({
	songInDb,
	// songId,
	// songIdGenius,
	// songTitle,
	// artist,
	songInUser,
	// setSongInUser,
}) => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	const addSong = () => {
		console.log("add song");
		if (isAuthenticated && !songInUser) {
			if (!songInDb) {
				// fetch pra adicionar a canção à coleção songs na DB
			}
			// por fim, fetch para adicionar a canção ao usuário
		}
	};

	const removeSong = () => {
		console.log("remove song");
		if (isAuthenticated && songInUser) {
			// fetch pra remover a canção a canção ao usuário
		}
	};

	return (
		<Wrapper>
			<Icon />
			{songInUser ? (
				<Button onClick={() => removeSong()}>Remove Song</Button>
			) : (
				<Button onClick={() => addSong()}>Save Song</Button>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.button`
	display: flex;
	background-color: transparent;
	padding: 5px 4px 4px 5px;
	border-radius: 10px;
	margin: 1px;
	&:hover {
		border: solid 1px var(--color-greyedOutText);
		cursor: pointer;
		&:active {
			top: 1px;
		}
	}
`;
const Button = styled.p`
	color: var(--color-functionalGreen);
	margin-left: 8px;
	width: 68px;
	text-align: left;
`;
const Icon = styled(BsVinylFill)`
	color: var(--color-functionalGreen);
`;

// const Wrapper = styled.div`
// 	display: block;
// 	position: relative;
// `;
// const UserFiles = styled.div`
// 	display: flex;
// `;
// const Button = styled.button`
// 	background-color: white;
// 	border: 1px lightgrey solid;
// 	cursor: pointer;
// 	margin: 8px;
// 	border-radius: 5px;
// 	padding: 2px 6px;
// 	font-family: arial;
// 	font-size: 16px;
// 	position: relative;
// 	&:hover {
// 		bottom: 1px;
// 		filter: drop-shadow(0 0 8px #bababa);
// 	}
// 	&:active {
// 		bottom: -1px;
// 	}
// `;
// const WrapperGreyedOutBtns = styled.div`
// 	display: block;
// `;
// const GreyedOutButton = styled.span`
// 	background-color: white;
// 	border: 1px lightgrey solid;
// 	color: lightgrey;
// 	cursor: default;
// 	margin: 8px;
// 	border-radius: 5px;
// 	padding: 2px 6px;
// 	font-family: arial;
// 	font-size: 16px;
// `;
// const SuggestLogin = styled.span`
// 	position: absolute;
// 	display: none;
// 	top: 10px;
// 	left: 20px;
// 	${WrapperGreyedOutBtns}:hover & {
// 		display: block;
// 		color: white;
// 		background-color: black;
// 		border-radius: 10%;
// 		padding: 4px 6px;
// 		box-shadow: 0px 4px 12px black;
// 	}
// `;
export default SaveSong;

// 	const { userId, username } = useContext(SearchContext);
// 	const { user, isAuthenticated, isLoading } = useAuth0();

// 	let the;
// 	let artistName;
// 	if (artist) {
// 		if (artist.substring(0, 3).toLowerCase() === "the") {
// 			artistName = artist.slice(4, artist.length);
// 			the = "The ";
// 		} else {
// 			artistName = artist;
// 			the = "";
// 		}
// 	}
// 	// const checkSongInDb = { artistName, songTitle };

// 	const saveSong = () => {
// 		if (username && isAuthenticated && songId) {
// 			fetch("/songs", {
// 				method: "POST",
// 				headers: {
// 					Accept: "application/json",
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({
// 					songId,
// 					songIdGenius,
// 					songTitle,
// 					artistName,
// 					the,
// 					userId,
// 				}),
// 			});
// 			// update user - add song to user's saved songs in the user object
// 			fetch("/users/" + userId, {
// 				method: "PUT",
// 				headers: {
// 					Accept: "application/json",
// 					"Content-Type": "application/json",
// 				},
// 				body: { songId },
// 			});
// 			// still missing an updateSong-fetch to add the userId to the song - in principle it's not important, but who knows if it can come in handy later to know every user who has saved a song?
// 		}
// 		setSongInUser(true);
// 	};

// 	const deleteSong = () => {
// 		if (username) {
// 			fetch("/users/songs", {
// 				method: "DELETE",
// 				headers: {
// 					Accept: "application/json",
// 					"Content-Type": "application/json",
// 				},
// 				// body: JSON.stringify({ userId: user.userId, songId }),
// 			});
// 		}
// 		setSongInUser(false);
// 	};

// 	const constellate = () => {
// 		// FORGET WHAT'S BELOW - THIS JUST TAKES TO THE CONSTELLATION CREATION PAGE WHERE THE CRITERIA IS SHOWN AND CAN BE SELECTED ALONG WITH THE NEED TO INDICATE OTHER SONGS
// 		// This one is complex. Ideally, it would consider (at least) four possible basic links between two songs - beat, harmony, melody, and timbre - and create a graphic where songs floating around have color-coded lines connecting them according to those links (ideally, these links should be (and be represented as) stronger or weaker, depending on the degree of affinity). For now, let's just show some dummy constellations created arbitrarily and allow the user to add/remove the song to/from them.
// 	};

// 	return (
// 		<Wrapper>
// 			{isAuthenticated ? (
// 				<Wrapper>
// 					<UserFiles>
// 						{songInUser ? (
// 							<Button
// 								onClick={() => {
// 									deleteSong();
// 								}}>
// 								Remove song
// 							</Button>
// 						) : (
// 							<Button
// 								onClick={() => {
// 									saveSong();
// 								}}>
// 								Save song
// 							</Button>
// 						)}
// 						<Button onClick={makeANote}>Make a note</Button>
// 						{showNoteEntryBox && (
// 							<NoteEntryBox
// 								setShowNoteEntryBox={setShowNoteEntryBox}
// 								setNoteText={setNoteText}
// 								noteText={noteText}>
// 								{noteText}
// 							</NoteEntryBox>
// 						)}
// 					</UserFiles>
// 					<Button onClick={constellate}>Constellate</Button>
// 				</Wrapper>
// 			) : (
// 				<WrapperGreyedOutBtns>
// 					<UserFiles>
// 						<GreyedOutButton>Save song</GreyedOutButton>

// 						<GreyedOutButton>Make a note</GreyedOutButton>
// 					</UserFiles>
// 					<GreyedOutButton>Constellate</GreyedOutButton>
// 					<SuggestLogin>Please login</SuggestLogin>
// 				</WrapperGreyedOutBtns>
// 			)}
// 		</Wrapper>
// 	);
