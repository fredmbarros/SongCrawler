import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { SearchContext } from "../SearchContext";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const SavedSongs = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	const {
		searchTerm,
		setSearchTerm,
		metaCategory,
		setMetaCategory,
		song,
		setSong,
		artist,
		setArtist,
		album,
		setAlbum,
		category,
		setCategory,
		rawSearchResults,
		setRawSearchResults,
		// searchGenius,
		// termToFetch,
	} = useContext(SearchContext);

	let navigate = useNavigate();
	let termToFetch = user?.email;

	const searchSavedSongs = async () => {
		fetch(`/users/${termToFetch}`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setRawSearchResults(data.user?.songs);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		searchSavedSongs();
	}, []);

	// HERE I HAVE TO SOLVE THE PROBLEM THAT I'M JUST SAVING EACH SONG'S ID (IN USER.SONGS), BUT TO RENDER THEM HERE IN THE SAVED SONGS TAB I'D EITHER HAVE TO DO A FETCH TO GENIUS FOR EACH ONE OF THEM TO GET TITLE AND IMAGE OR CHANGE MY WHOLE DB SCHEME TO MAKE USER.SONGS AN ARRAY OF OBJECTS, AND NOT A SIMPLE ARRAY FILLED WITH STRINGS
	return (
		<>
			<ul>
				{rawSearchResults.map((item, index) => {
					return (
						<LI key={uuidv4()}>
							<Result
								as={Link}
								// to={item.result.api_path}
								// onClick={() => {
								// 	toRender(rawSearchResults[index].result);
								// }}
							>
								{/* <IMG src={item.result.header_image_thumbnail_url} /> */}
								{/* <TitleAndArtist>{item.result.full_title}</TitleAndArtist> */}
							</Result>
							<DIV></DIV>
						</LI>
					);
				})}
			</ul>
		</>
	);
};

const LI = styled.li`
	display: flex;
`;
const Result = styled.div`
	align-items: center;
	width: 100%;
	display: flex;
	justify-content: left;
	border: none;
	background-color: white;
	margin: 6px;
	padding: 0 0 4px 0;
	border-bottom: solid 1px darkgrey;
	margin-right: 40px;
	text-decoration: none; // ????
`;
const DIV = styled.div``;
const IMG = styled.img`
	width: 60px;
	height: 60px;
	border-radius: 5px;
	filter: drop-shadow(0 0 4px #bababa);
`;

const TitleAndArtist = styled.p`
	margin: 0 0 0 18px;
	filter: drop-shadow(0 0 16px #bababa);
	text-decoration: none; // ????
	position: relative;

	&:hover {
		bottom: 1px;
	}
`;

export default SavedSongs;
