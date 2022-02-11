import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

import SongInfo from "../pages/SongInfo";

const FetchSong = () => {
	const { geniusId } = useParams();
	const [geniusInfo, setGeniusInfo] = useState({});
	const [dbInfo, setDbInfo] = useState({});

	const fetchingSong = async () => {
		try {
			const [geniusResponse, dbResponse] = await Promise.all([
				fetch("https://genius.p.rapidapi.com/songs/" + geniusId, {
					method: "GET",
					headers: {
						"x-rapidapi-host": "genius.p.rapidapi.com",
						"x-rapidapi-key": process.env.REACT_APP_x_rapidapi_key,
					},
				}),
				// from DB
				// fetch("songs/songByApiId/" + geniusId),
			]);
			if (!geniusResponse.ok) {
				const message = "From Genius: Error " + geniusResponse.status;
				throw new Error(message);

				// at least as long as the API results take precedence, better to just bypass any errors in the DB:
				// } else if (!dbResponse.ok) {
				// 	console.log("Nothing in DB");
				// 	const message = "From DB: Error " + dbResponse.status;
				// 	throw new Error(message);
			} else {
				// ADDING THE GENIUSINFO OBJECT TO THE STATE VARIABLE OBJECT SONG
				const songFromGenius = await geniusResponse.json();
				// const songFromDB = await dbResponse.json();
				setGeniusInfo(songFromGenius.response.song);
				// setDbInfo(songFromDB);
				console.log(geniusInfo);
			}
		} catch (error) {
			return error;
		}
	};

	useEffect(() => {
		fetchingSong();
	}, []);

	return <SongInfo geniusInfo={geniusInfo} />;
};

export default FetchSong;
