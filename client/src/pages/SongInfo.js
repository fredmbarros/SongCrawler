import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SongInfo = () => {
	const { geniusId } = useParams();
	let song = {};

	const fetchSong = async () => {
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
				const songFromGenius = await geniusResponse.json();
				// const songFromDB = await dbResponse.json();
				song.geniusInfo = songFromGenius.response.song;
				// song.push(songFromDB);
				console.log(song.geniusInfo);
			}
		} catch (error) {
			return error;
		}
	};

	useEffect(() => {
		fetchSong();
	}, []);

	return (
		<>
			<p>Song info</p>
		</>
	);
};

export default SongInfo;

// await fetch(`/users/${userId}`)
// 			.then((res) => res.json())
// 			.then((data) => {
// 				console.log("data:");
// 				console.log(data);
// 				if (
// 					data.userInDb.songs.find((song) => {
// 						return song === songId;
// 					})
// 				) {
// 					setSongInUser(songIdGenius);
// 				}
// 			});
