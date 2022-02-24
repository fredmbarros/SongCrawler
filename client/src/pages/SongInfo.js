import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

import SaveSong from "../components/SaveSong";
import SongInfoBoard from "../components/SongInfoBoard";

const SongInfo = ({
	geniusData,
	song,
	songInDb,
	songInUser,
	setSongInUser,
}) => {
	// if (artist.name) {
	// 	if (artist.substring(0, 3).toLowerCase() === "the") {
	// 		artistName = artist.slice(4, artist.length);
	// 		the = "The ";
	// 	} else {
	// 		artistName = artist;
	// 		the = "";
	// 	}
	// }
	// };

	if (!song || !geniusData) {
		return <p>Loading...</p>;
	} else {
		return (
			<Wrapper>
				<Position>
					<Thumbnail src={geniusData.song_art_image_url}></Thumbnail>
					<InfoAndSaveBtn>
						<div>
							<Title>{song.song.title}</Title>
							<Artist>{song.artist.completeName}</Artist>
						</div>
						<div>
							<SaveSong
								songInDb={songInDb}
								song={song}
								songInUser={songInUser}
								setSongInUser={setSongInUser}
							/>
							{/* {geniusData.apple_music_id} */}
						</div>
					</InfoAndSaveBtn>
				</Position>
				<SongInfoBoard geniusData={geniusData} song={song} />
			</Wrapper>
		);
	}
};

const Wrapper = styled.div`
	// background-color: transparent;
	background-image: linear-gradient(var(--color-BgGradientStart), black);
	color: white;
`;
const Position = styled.div`
	display: flex;
	width: 34vw;
	align-items: center;
	margin: auto;
	padding: 120px 0 80px 20px;
	// border: solid blue 3px;
`;
const InfoAndSaveBtn = styled.div`
	display: flex;
	flex-flow: column wrap;
	margin-left: 32px;
	height: 250px;
	justify-content: space-around;
	// border: solid blue 3px;
`;
const Thumbnail = styled.img`
	filter: drop-shadow(0 12px 20px black);
	// margin: 0 0 0 50px;
	width: 250px;
	height: 250px;
	border-radius: 15px;
`;
const Title = styled.h2`
	font-size: 30px;
	font-weight: 100;
	margin-bottom: 6px;
`;
const Artist = styled.h3``;

export default SongInfo;

{
	/* <Body>
	<InfoWrapper>
		<h2>Song info</h2>
		<div>
			<h4>Songwriter(s): </h4>
			<div key={uuidv4()}>
				{writer_artists.map((songwriter) => {
					return (
						<div key={uuidv4()}>
							<p>{songwriter.name}</p>
						</div>
					);
				})}
			</div>
		</div>

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
		<NotesBox>
			<P>Song Notes</P>
			  map over songIdNotes
		</NotesBox>
	</NotesAndRelated>
</Body>; */
}
