import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import AddToLists from "./AddToLists";

const Songs = () => {
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
		searchGenius,
		termToFetch,
	} = useContext(SearchContext);

	const { songId } = useParams();
	const navigate = useNavigate();

	const contribute = (
		<Contribute onClick={() => navigate("/contribute")}>Contribute?</Contribute>
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
	console.log(song);
	if (!song) {
		return <p>Loading</p>;
	} else {
		return (
			<Wrapper>
				<Head>
					<NameAndPicDiv>
						<Thumbnail src={song.song_art_image_thumbnail_url}></Thumbnail>
						<MainInfoHead>
							<h1>{song.title}</h1>
							<h2>by {song.artist_names}</h2>
							<p>Primary artist: {song.primary_artist.name}</p>
							<AddToLists
								songId={songId}
								songTitle={song.title}
								artist={song.artist_names}
							/>
						</MainInfoHead>
						<AlbumInfo>
							<p>Album:</p>
							{song.album ? (
								<>
									<AlbumThumbnail
										src={
											song.album.cover_art_url ? (
												song.album.cover_art_url
											) : (
												<p>Cover not available</p>
											)
										}></AlbumThumbnail>
									<p>{song.album.name}</p>
									<p>by {song.album.artist.name}</p>
								</>
							) : (
								<p>Missing info. {contribute}</p>
							)}
						</AlbumInfo>
					</NameAndPicDiv>
				</Head>
				<BodyWrapper>
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
								<Featured key={uuidv4()}>
									<h4>Featured:</h4>
									<p>{artist.name}</p>
									<ThumbnailSmall src={artist.image_url}></ThumbnailSmall>
								</Featured>
							);
						})}

					<h4>Personnel:</h4>
					{song.producer_artists.length > 0 ? (
						song.producer_artists.map((producer) => {
							return (
								<div key={uuidv4()}>
									<p>Producer: {producer.name}</p>
								</div>
							);
						})
					) : (
						<p>Missing info. {contribute}</p>
					)}

					{song.custom_performances.length > 0 ? (
						song.custom_performances.map((performance) => {
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
					) : (
						<p>Missing info. {contribute}</p>
					)}

					<h4>Recording location:</h4>
					{song.recording_location ? (
						<p>{song.recording_location}</p>
					) : (
						<p>Missing info. {contribute}</p>
					)}

					<h4>Release date: </h4>
					{song.release_date_for_display ? (
						<p>{song.release_date_for_display}</p>
					) : (
						<p>Missing info. {contribute}</p>
					)}
					<div>
						<h4>Song relationships</h4>
						{song.song_relationships.length > 0 ? (
							song.song_relationships.map((rel) => {
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
							})
						) : (
							<p>Missing info. {contribute}</p>
						)}
					</div>
				</BodyWrapper>
			</Wrapper>
		);
	}
};

const Wrapper = styled.div`
	background-color: #68696e;
	color: white;
	filter: drop-shadow(0 0 8px #1f2124);
`;
const BodyWrapper = styled.div`
	margin: 0 20px;
	filter: drop-shadow(0 0 8px #1f2124);
`;
const Head = styled.div`
	background-color: lightgrey;
	display: flex;
`;
const MainInfoHead = styled.div`
	margin: 20px 56px;
	color: black;
	filter: drop-shadow(0 0 8px #68696e);
`;
const NameAndPicDiv = styled.div`
	display: flex;
	flex-direction: row;
`;
const Thumbnail = styled.img`
	filter: drop-shadow(0 0 8px #1f2124);
	margin: 10px;
	width: 360px;
	height: 360px;
`;
const AlbumThumbnail = styled.img`
	height: 140px;
	width: auto;
	filter: drop-shadow(0 0 6px #1f2124);
`;
const AlbumInfo = styled.div`
	width: 160px;
	padding: 20px;
	margin: 20px;
	color: black;
`;
const Featured = styled.div`
	display: flex;
	align-items: baseline;
`;
const ThumbnailSmall = styled.img`
	height: 50px;
	width: auto;
`;
const Contribute = styled.p`
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
