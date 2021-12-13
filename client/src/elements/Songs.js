import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import AddToLists from "./AddToLists";

const Songs = () => {
	const {
		user,
		setUser,
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
		searchGenius,
		termToFetch,
	} = useContext(SearchContext);

	const { songId } = useParams();
	console.log(songId);
	const navigate = useNavigate();

	const missingInfo = (
		<MissingInfo onClick={() => navigate("/contribute")}>
			Missing info. Contribute?
		</MissingInfo>
	);

	const fetchSong = async () => {
		console.log(process.env.REACT_APP_x_rapidapi_key);
		await fetch("https://genius.p.rapidapi.com/songs/" + songId, {
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
				setSong(data.response.song);
				localStorage.setItem("songId", songId);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		fetchSong();
	}, [songId]);

	// how to solve this? a variable here sometimes isn't defined when the component mounts, so it breaks the code; I can't find the syntax to do inline and can't find a way to use the song.artist.etc variable down there in the styled.div because of the back-ticks - moreover, the thumbnail is inheriting what I define here for the bg
	// let bgImg = {
	// 	backgroundImage: `url(${song.album.artist.header_image_url})`,
	// 	filter: "contrast(70%) brightness(40%) blur(50%)",
	// };

	if (!song) {
		return <p>Loading</p>;
	} else {
		return (
			<>
				<p>Songs</p>
				<Head>
					<NameAndPicDiv>
						<Thumbnail src={song.song_art_image_thumbnail_url}></Thumbnail>
						<div>
							<h1>{song.title}</h1>
							<h2>by {song.artist_names}</h2>
							<p>Primary artist: {song.primary_artist.name}</p>
							<AddToLists />
						</div>
						<AlbumInfo>
							<AlbumThumbnail src={song.album.cover_art_url}></AlbumThumbnail>
							<p>
								Album: {song.album.name}, by {song.album.artist.name}
							</p>
						</AlbumInfo>
					</NameAndPicDiv>
				</Head>

				<div>
					<h4>Songwriter(s): </h4>
					<div key={uuidv4()}>
						{song.writer_artists.map((songwriter) => {
							return (
								<div key={uuidv4()}>
									<p>{songwriter.name}</p>
								</div>
							);
						})}
					</div>
				</div>

				{song.featured_artists.length > 0 &&
					song.featured_artists.map((artist) => {
						return (
							<div key={uuidv4()}>
								<h4>Featured artist: {artist.name}</h4>
								<ThumbnailSmall src={artist.image_url}></ThumbnailSmall>
							</div>
						);
					})}

				<h4>Personnel:</h4>
				{song.producer_artists.length > 0
					? song.producer_artists.map((producer) => {
							return (
								<div key={uuidv4()}>
									<p>Producer: {producer.name}</p>
								</div>
							);
					  })
					: missingInfo}

				{song.custom_performances.length > 0
					? song.custom_performances.map((performance) => {
							return (
								<div key={uuidv4()}>
									{performance.artists.map((performer) => {
										return (
											<p key={uuidv4()}>
												{performance.label}: {performer.name}
											</p>
										);
									})}
								</div>
							);
					  })
					: missingInfo}

				<h4>Recording location:</h4>
				{song.recording_location ? (
					<p>{song.recording_location}</p>
				) : (
					missingInfo
				)}

				<h4>Release date: </h4>
				<p>{song.release_date_for_display}</p>
				<div>
					<h4>Song relationships</h4>
					{song.song_relationships.map((rel) => {
						return (
							<div key={uuidv4()}>
								{rel.songs.length > 0 && <h4>{rel.relationship_type}</h4>}
								{rel.songs.map((song) => {
									return (
										<Result as={Link} to={song.api_path} key={uuidv4()}>
											<p>{song.full_title}</p>
										</Result>
									);
								})}
							</div>
						);
					})}
				</div>
			</>
		);
	}
};

const Head = styled.div`
	background-color: lightgrey;
	display: flex;
`;
const NameAndPicDiv = styled.div`
	display: flex;
	flex-direction: row;
`;
const Thumbnail = styled.img`
	border: solid white 1px;
	box-shadow: lightgrey 0 2px 10px;
`;
const AlbumThumbnail = styled.img`
	height: 140px;
	width: auto;
`;
const AlbumInfo = styled.div`
	width: 160px;
	padding: 20px;
	margin: 20px;
`;
const ThumbnailSmall = styled.img`
	height: 50px;
	width: auto;
`;
const MissingInfo = styled.p`
	color: blue;
	cursor: pointer;
`;
const Result = styled.div`
	width: 100%;
	display: flex;
	justify-content: left;
	border: none;
	background-color: white;
	&:hover {
		background-color: lightgrey;
	}
`;
export default Songs;
