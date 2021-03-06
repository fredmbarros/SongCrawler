import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import RenderResults from "../components/RenderResults";

const SearchResults = () => {
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
	let termToFetch = localStorage.getItem("searchTerm");

	const searchGenius = async () => {
		await fetch("https://genius.p.rapidapi.com/search?q=" + termToFetch, {
			method: "GET",
			headers: {
				"x-rapidapi-host": "genius.p.rapidapi.com",
				"x-rapidapi-key": process.env.REACT_APP_x_rapidapi_key,
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setRawSearchResults(data.response.hits);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const searchDB = async () => {
		// await
	};

	useEffect(() => {
		searchGenius();
	}, []);

	return (
		<Wrapper>
			<RenderResults resultsToRender={rawSearchResults} />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	margin: 90px 0;
`;

export default SearchResults;

// setType(item.type);
// 				setImage(item.result.song_art_image_url);
// 				.result.header_image_url
// 				result.artist_names
// 				.title_with_featured
// 				.url
// 				.primary_artist.header_image_url
// 				setArtistInfoGenius.primary_artist.url

// let result = resultsRaw.response.hits[0].result;
// const resultsRaw = {
// 	meta: {
// 		status: 200,
// 	},
// 	response: {
// 		hits: [
// 			{
// 				highlights: [],
// 				index: "song",
// 				type: "song",
// 				result: {
// 					annotation_count: 15,
// 					api_path: "/songs/98664",
// 					artist_names: "Bob Dylan",
// 					full_title: "All Along the Watchtower by Bob Dylan",
// 					header_image_thumbnail_url:
// 						"https://images.genius.com/f727dfc7b28942c59cd6695d9a2dcf2c.300x300x1.jpg",
// 					header_image_url:
// 						"https://images.genius.com/f727dfc7b28942c59cd6695d9a2dcf2c.1000x1000x1.jpg",
// 					id: 98664,
// 					lyrics_owner_id: 779,
// 					lyrics_state: "complete",
// 					path: "/Bob-dylan-all-along-the-watchtower-lyrics",
// 					pyongs_count: 42,
// 					song_art_image_thumbnail_url:
// 						"https://images.genius.com/,40169c4a86e479f32e7a44e3ae4d85d4.300x300x1.jpg",
// 					song_art_image_url:
// 						"https://images.genius.com/,40169c4a86e479f32e7a44e3ae4d85d4.320x320x1.jpg",
// 					stats: {
// 						unreviewed_annotations: 0,
// 						hot: false,
// 						pageviews: 377501,
// 					},
// 					title: "All Along the Watchtower",
// 					title_with_featured: "All Along the Watchtower",
// 					url: "https://genius.com/Bob-dylan-all-along-the-watchtower-lyrics",
// 					primary_artist: {
// 						api_path: "/artists/181",
// 						header_image_url:
// 							"https://images.genius.com/facc753d420efc53bbe1e0b63a72d70b.960x719x1.jpg",
// 						id: 181,
// 						image_url:
// 							"https://images.genius.com/22306423b6ad8777d1ed5b33ad8b0d0b.1000x1000x1.jpg",
// 						is_meme_verified: false,
// 						is_verified: false,
// 						name: "Bob Dylan",
// 						url: "https://genius.com/artists/Bob-dylan",
// 					},
// 				},
// 			},
// 		],
// 	},
// };
