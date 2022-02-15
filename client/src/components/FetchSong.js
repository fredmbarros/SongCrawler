import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

import SongInfo from "../pages/SongInfo";

const FetchSong = () => {
	const { geniusId } = useParams();
	const [songInfo, setSongInfo] = useState({ geniusInfo: {}, dbInfo: {} });
	const [songInDb, setSongInDb] = useState();

	const fetchingSong = async () => {
		let songFromGenius = {};
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
				const message = "From Genius: Error " + geniusResponse.status;
				throw new Error(message);
			}
			if (dbResponse.ok) {
				let response = await dbResponse.json();
				songFromDb = response.song;
				console.log(songFromDb);
				// defining if user saved the song: getUser made elsewhere (perhaps on login and saved in sessionStorage) is acessed to check if songId (not geniusId) can be found. If true, setSongInDb true
				let userSavedSong;
				let savedSongsArr = [];
				savedSongsArr.push(window.localStorage.getItem("savedSongs"));
				console.log(savedSongsArr);
				savedSongsArr.map((item) => {
					if (songFromDb.songId === item) {
						return true;
					}
				});
				if (userSavedSong) console.log("true");

				// userSavedSong ? setSongInDb(true) : setSongInDb(false);
			}
			// adding info from Genius and, if present, from DB to the object songInfo
			songFromGenius = await geniusResponse.json();
			setSongInfo({
				geniusInfo: songFromGenius.response.song,
				dbInfo: songFromDb,
			});
		} catch (error) {
			return error;
		}
	};

	useEffect(() => {
		fetchingSong();
	}, []);

	return <SongInfo songInfo={songInfo} songInDb={songInDb} />;
};

export default FetchSong;
