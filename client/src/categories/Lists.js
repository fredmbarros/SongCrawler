import { useState, useContext } from "react";
import { SearchContext } from "../SearchContext";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Lists = () => {
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

	return (
		<>
			<p>Lists</p>
		</>
	);
};

export default Lists;
