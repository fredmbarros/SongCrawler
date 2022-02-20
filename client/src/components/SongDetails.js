import styled from "styled-components";

const SongDetails = ({data}) => {
	return (
		<>
			<p>SongDetails</p>
		</>
	);
};

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
