import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Artist = () => {
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
		searchGenius,
		rawSearchResults,
		setRawSearchResults,
	} = useContext(SearchContext);

	const { geniusURL } = useParams();
	console.log(geniusURL);
	let artistInfo;
	const [researchedArtist, setResearchedArtist] = useState();

	const searchArtist = async () => {
		await fetch("https://genius.p.rapidapi.com/songs/" + geniusURL, {
			method: "GET",
			headers: {
				"x-rapidapi-host": "genius.p.rapidapi.com",
				"x-rapidapi-key": "7ad4910444msh707052b566c420fp105e59jsn784037303d1b",
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setResearchedArtist(data.response.artist);
				artistInfo = data.response.artist;
				console.log(artistInfo);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		searchArtist();
	}, []);

	if (researchedArtist) {
		return (
			<>
				<img></img>
				<h1>{researchedArtist.name}</h1>
				{researchedArtist?.alternate_names.length > 0 && (
					<p>Alternate names: {researchedArtist?.alternate_names}</p>
				)}
				<h4>Socials:</h4>
				{researchedArtist?.facebook_name && (
					<p>Facebook: {researchedArtist?.facebook_name}</p>
				)}
				{researchedArtist?.instagram_name && (
					<p>Instagram: {researchedArtist?.instagram_name}</p>
				)}
				{researchedArtist?.twitter_name && (
					<p>Twitter: {researchedArtist?.twitter_name}</p>
				)}
				<p>
					pegar state var artist e fazer um fetch da busca de artista do genius
					- eu tenho até o endereço da página do artist no G, tvz ele me dê
					naquele o objeto o id do artista, algo assim
				</p>
			</>
		);
	} else {
		return <p>Loading</p>;
	}
};

export default Artist;
