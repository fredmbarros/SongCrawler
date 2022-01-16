import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { SearchContext } from "../SearchContext";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import AddToLists from "./AddToLists";

const Songs = () => {
	const {
		// userId,
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
	const { user, isAuthenticated, isLoading } = useAuth0();
	const songIdGenius = useParams().songId;
	const navigate = useNavigate();
	const [songInUser, setSongInUser] = useState(false);

	const contribute = (
		<Contribute onClick={() => navigate("/contribute")}>
			- contribute?
		</Contribute>
	);

	console.log(songIdGenius);
	const fetchSong = async () => {
		await fetch("https://genius.p.rapidapi.com/songs/" + songIdGenius, {
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
				window.localStorage.setItem("songIdGenius", songIdGenius);
			})
			.catch((err) => {
				console.error(err);
			});

		// fetching user information to get the list of songs they've saved
		const userId = window.localStorage.getItem("userId");
		console.log("userId:");
		console.log(userId);
		await fetch(`/users/${userId}`)
			.then((res) => res.json())
			.then((data) => {
				console.log("data:");
				console.log(data);
				if (
					data.userInDb.songs.find((song) => {
						return song === songIdGenius;
					})
				) {
					setSongInUser(songIdGenius);
				}
			});
	};

	useEffect(() => {
		fetchSong();
	}, [songIdGenius]);

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
							<H2>by {song.artist_names}</H2>
							<p>Primary artist: {song.primary_artist.name}</p>
							<AddToLists
								songId={uuidv4()}
								songIdGenius={songIdGenius}
								songTitle={song.title}
								artist={song.artist_names}
								songInUser={songInUser}
								setSongInUser={setSongInUser}
							/>
						</MainInfoHead>
						<p>Related songs - listar tb samples e afins</p>
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
								<span>Missing info {contribute}</span>
							)}
						</AlbumInfo>
					</NameAndPicDiv>
				</Head>

				<Body>
					<InfoWrapper>
						<h2>Song info</h2>
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

						{/* {song.featured_artists.length > 0 &&
						song.featured_artists.map((artist) => {
							return (
								<Featured key={uuidv4()}>
									<h4>Featured:</h4>
									<p>{artist.name}</p>
									<ThumbnailSmall src={artist.image_url}></ThumbnailSmall>
								</Featured>
							);
						})} */}

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
							<span>Missing info {contribute}</span>
						)}
						{song.custom_performances.length > 0 ? (
							song.custom_performances.map((performance) => {
								return (
									<div key={uuidv4()}>
										{performance.artists.map((performer) => {
											return (
												<p key={uuidv4()}>
													{performance.label + ": " + performer.name}
												</p>
											);
										})}
									</div>
								);
							})
						) : (
							<span>Missing info {contribute}</span>
						)}
						<ResultDiv>
							<span>Recording location: </span>
							{song.recording_location ? (
								<span>{song.recording_location}</span>
							) : (
								<span>Missing info {contribute}</span>
							)}
						</ResultDiv>
						<ResultDiv>
							<h4>Release date: </h4>
							{song.release_date_for_display ? (
								<p>{song.release_date_for_display}</p>
							) : (
								<span>Missing info {contribute}</span>
							)}
						</ResultDiv>
						<div>
							<h4>Song relationships:</h4>
							{song.song_relationships.length > 0 ? (
								song.song_relationships.map((rel) => {
									return (
										<div key={uuidv4()}>
											{rel.songs.length > 0 && (
												<h4>
													-{" "}
													{rel.relationship_type
														.trim()
														.replace(/^\w/, (c) => c.toUpperCase())
														.replace(/_/g, " ")}
													:
												</h4>
											)}
											{rel.songs.map((song) => {
												return (
													<Result to={song.api_path} key={uuidv4()}>
														<p>{song.full_title}</p>
													</Result>
												);
											})}
										</div>
									);
								})
							) : (
								<span>Missing info {contribute}</span>
							)}
						</div>
					</InfoWrapper>
					<NotesAndRelated>
						<H2>Notes</H2>
						<NotesBox></NotesBox>
						<RelatedSongs>
							<H2>Related songs</H2>
							<P>Beat</P>
							<P>Harmony</P>
							<P>Melody</P>
							<P>Timbre</P>
						</RelatedSongs>
					</NotesAndRelated>
				</Body>
			</Wrapper>
		);
	}
};

const Wrapper = styled.div`
	background-color: #68696e;
	color: white;
	border: solid 2px #363636;
`;
const Head = styled.div`
	background-color: lightgrey;
	display: flex;
	border-bottom: solid 2px #363636;
	padding: 20px;
	position: relative;
	z-index: 1;
`;
const MainInfoHead = styled.div`
	margin: 20px 56px;
	color: black;
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
const Body = styled.div`
	display: flex;
	flex-direction: row;
`;
const H2 = styled.h2`
	padding: 0 0 0 20px;
`;
const InfoWrapper = styled.div`
	margin: 0 20px;
	max-height: 600px;
	width: 30%;
	overflow: auto;
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
const ResultDiv = styled.div`
	display: flex;
	flex-direction: row;
`;
const Result = styled(Link)`
	width: 100%;
	display: flex;
	justify-content: left;
	border: none;
	background-color: #68696e;
	position: relative;
	text-decoration: none;
	color: white;
	&:hover {
		bottom: 1px;
	}
`;
const NotesAndRelated = styled.div`
	width: 70%;
	border-left: solid 1px black;
`;
const NotesBox = styled.div`
	margin: 16px;
	border: solid lightgrey 1px;
	border-radius: 5px;
	background-color: #fffefa;
	filter: drop-shadow(0 0 8px #1f2124);
	min-height: 300px;
`;
const RelatedSongs = styled.div`
	// margin: 16px;
`;
const P = styled.p`
	margin: 20px;
`;
export default Songs;
