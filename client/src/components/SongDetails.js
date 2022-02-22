import { Link } from "react-router-dom";
import styled from "styled-components";

const SongDetails = ({ data }) => {
	console.log(data.writer_artists[0].name);
	return (
		<Wrapper>
			<Columns>
				{data.writer_artists.length ? (
					<div>
						{data.writer_artists.length > 1 ? (
							<H5>Composers:</H5>
						) : (
							<H5>Composer:</H5>
						)}
						{data.writer_artists.map((artist, index) => {
							return <p key={index}>{artist.name}</p>;
						})}
					</div>
				) : (
					<div>
						<H5>Composers:</H5>
						<H6>No info</H6>
					</div>
				)}

				<H5>Album:</H5>
				<Result as={Link} to={data.album.api_path}>
					<IMG src={data.album.cover_art_url} />
					<TitleAndArtist>{data.album.full_title}</TitleAndArtist>
				</Result>
				<H5>Recording location:</H5>
				{data.recording_location ? (
					<p>{data.recording_location}</p>
				) : (
					<H6>No info</H6>
				)}
				<H5>Release date:</H5>
				{data.release_date_for_display ? (
					<p>{data.release_date_for_display}</p>
				) : (
					<H6>No info</H6>
				)}
			</Columns>
			<Columns>
				<div>
					<H5>Credits:</H5>
					{data.custom_performances.map((item, index) => {
						return (
							<div key={index}>
								<div>
									<H6>{item.label.replace(" By", ": ")}</H6>
									{item.artists.map((artist, index) => {
										return <p key={index}>{artist.name}</p>;
									})}
								</div>
							</div>
						);
					})}
				</div>
			</Columns>
			<Columns>
				{/* <div>
					<H5>Song relationships:</H5>
					<H6>No info</H6>
				</div>
				<div>
					{data.song_relationships.map((item, index) => {
						<p key={index}>item.relationship_type</p>;
						console.log(data.song_relationships);
						item.songs.length > 0 ? (
						<div>
							{item.songs.map((song, index) => {
								<H5 key={index}>{song.full_title}</H5>;
							})}
						</div>
						) : (
						<div>No info</div>
						)
					})}
				</div> */}
				<div>
					{data.song_relationships.map((item, index) => {
						return (
							<>
								{item.songs.length > 0 && (
									<div>
										{item.relationship_type !== "remixed_by" ? (
											<H5 key={index}>
												{item.relationship_type
													.trim()
													.replace(/^\w/, (c) => c.toUpperCase())
													.replace(/_/g, " ")}
												:
											</H5>
										) : (
											<H5>Remixes</H5>
										)}
										{item.songs.map((song, index) => {
											return item.relationship_type !== "covered_by" ? (
												<p key={index}>{song.full_title}</p>
											) : (
												<p key={index}>{song.artist_names}</p>
											);
										})}
									</div>
								)}
							</>
						);
					})}
				</div>
			</Columns>
		</Wrapper>
	);
};

{
	/* <div>
					song relationships:{" "}
					{data.song_relationships.map((item, index) => {
						return <p key={index}>{item}</p>;
					})}
					{data.producer_artists.map((artist, index) => {
						return (
							<div key={index}>
								<p>{artist.name}</p>
								<p>{artist.url}</p>
							</div>
						);
					})}
				</div>
				<p>Apple Music: {data.apple_music_id}</p>
				<p>{data.apple_music_player_url}</p>
			</div> */
}

const Wrapper = styled.div`
	margin: 20px 0 0 0;
	display: flex;
	justify-content: center;
	background-size: cover:
	background-image: linear-gradient(var(--color-BgGradientStart), black);
	padding: 0 0 50px 0;
`;

const Columns = styled.div`
	width: 160px;
	margin: 10px;
`;
const H5 = styled.h5`
	margin: 8px 0 1px 0;
	color: var(--color-greyedOutText);
	font-size: 1.2rem;
`;
const H6 = styled.p`
	margin: 4px 0 1px 0;
	color: var(--color-greyedOutText);
`;
const Result = styled.div`
	align-items: center;
	width: 100%;
	text-decoration: none; // ????
`;
const IMG = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 10px;
	// filter: drop-shadow(0 12px 20px black);
`;

const TitleAndArtist = styled.p`
	margin-top: 14px;
	width: 8vw;
	// text-decoration: none; // ????
	position: relative;
`;

export default SongDetails;

// data that will come from Genius regardless of song being in the DB:
// Object.assign(consolidatedData, {songImage: geniusData.song_art_image_url, composer: writer_artists, recordingLocation: recording_location});

// writer artists[array]
// recording_location: null
// release_date_for_display: "2014"
// custom_performances[array].label / .artists[array]
// album.api_path
// album.artist.name / .artist.api_path / .artist.name / .name / .cover_art_url
// geniusData.song_relationships[array]
// producer_artists[array].name
// producer_artists[array].url
// appleMusic: {apple_music_id: "916004619"
// apple_music_player_url: "https://genius.com/songs/2225691/apple_music_player"},
