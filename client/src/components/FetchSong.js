import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import SongInfo from "../pages/SongInfo";

const FetchSong = () => {
	const { geniusId } = useParams();
	const [songInDb, setSongInDb] = useState();
	const [songInUser, setSongInUser] = useState();
	// const [song, setSong] = useState();
	const [song, setSong] = useState();

	const [geniusData, setGeniusData] = useState();
	// const [dbData, setDbData] = useState();
	// let geniusData;
	// let dbData;

	const fetchingSong = async () => {
		let songFromGenius;
		let songFromDb = {};
		let songId;
		try {
			const [geniusResponse, dbResponse] = await Promise.all([
				// from API
				fetch("https://genius.p.rapidapi.com/songs/" + geniusId, {
					method: "GET",
					headers: {
						"x-rapidapi-host": "genius.p.rapidapi.com",
						"x-rapidapi-key": process.env.REACT_APP_x_rapidapi_key,
					},
				}),
				// from DB
				fetch("/songs/songInDbByApiId/" + geniusId),
			]);

			if (!geniusResponse.ok) {
				const message = "Could not get song from API: " + geniusResponse.status;
				throw new Error(message);
			} else {
				let response = await geniusResponse.json();
				songFromGenius = response.response.song;
				setGeniusData(songFromGenius);
			}

			if (dbResponse.song) {
				let response = await dbResponse.json();
				songFromDb = response.song;
				console.log("song found in DB:");
				// defining if user saved the song: getUser made elsewhere and saved in sessionStorage - acessed to check if songId (not geniusId) can be found
				let userSavedSong;
				let savedSongsArr = [];
				savedSongsArr.push(window.localStorage.getItem("savedSongs"));
				console.log("this user's saved songs: " + savedSongsArr);
				savedSongsArr.map((item) => {
					if (songFromDb.songId === item) {
						userSavedSong = true;
						console.log("user saved song - 1");
					}
				});
				console.log(userSavedSong);
				userSavedSong ? setSongInUser(true) : setSongInUser(false);
				// adding info from DB to the object song
				setSong(songFromDb);
			} else {
				// adding info from Genius to the object song - general info from Genius (geniusData) will also be passed on as props so that SongDetails can be rendered
				console.log(songFromGenius);
				let consolidatedFromGenius = {
					songId: uuidv4(),
					songIdGenius: geniusId,
					song: {
						fullTitle: songFromGenius.full_title,
						title: songFromGenius.title,
					},
					artist: {
						the: "",
						name: songFromGenius.primary_artist.name,
						completeName: songFromGenius.artist_names,
					},
					constellations: [],
				};
				setSong(consolidatedFromGenius);
			}
		} catch (error) {
			return error;
		}
	};

	useEffect(() => {
		fetchingSong();
	}, []);
	console.log(song);
	console.log(geniusData);
	return (
		<SongInfo
			geniusData={geniusData}
			song={song}
			songInDb={songInDb}
			songInUser={songInUser}
			setSongInUser={setSongInUser}
		/>
	);
};

export default FetchSong;
