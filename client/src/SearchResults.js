import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SearchContext } from "./SearchContext";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

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

	useEffect(() => {
		searchGenius();
	}, []);

	return (
		<>
			<ul>
				{rawSearchResults.map((item, index) => {
					console.log(item.result.api_path);

					return (
						<LI key={uuidv4()}>
							<Result
								as={Link}
								to={item.result.api_path}
								// onClick={() => {
								// 	toRender(rawSearchResults[index].result);
								// }}
							>
								<IMG src={item.result.header_image_thumbnail_url} />
								<TitleAndArtist>{item.result.full_title}</TitleAndArtist>
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
		top: 1px;
	}
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
