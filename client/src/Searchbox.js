import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "./SearchContext";
import styled from "styled-components";

const Searchbox = () => {
	const {
		searchTerm,
		setSearchTerm,
		category,
		setCategory,
		setRawSearchResults,
		rawSearchResults,
	} = useContext(SearchContext);

	let navigate = useNavigate();

	const handleSubmit = (ev) => {
		localStorage.setItem("searchTerm", searchTerm);
		navigate("./results");
	};
	return (
		<Form onSubmit={handleSubmit}>
			<BoxAndButton>
				<label for="search" />
				<InputBox
					type="search"
					id="search"
					name="search"
					value={searchTerm}
					placeholder="on hover explain search"
					onChange={(ev) => setSearchTerm(ev.target.value)}
				/>
				<SubmitBtn type="submit" name="SubmitBtn" value="Go" />
			</BoxAndButton>
			{/* <div onChange={(ev) => setCategory(ev.target.value)}>
				<Radio
					type="radio"
					id="song"
					name="category"
					value="song"
					defaultChecked
				/>
				<Label for="song">Song</Label>
				<Radio type="radio" id="artist" name="category" value="artist" />
				<Label for="artist">Artist</Label>
				<Radio type="radio" id="Album" name="category" value="album" />
				<Label for="Album">Album</Label>
			</div> */}
		</Form>
	);
};

const Form = styled.form`
	margin: 20px;
	border: solid blue 2px;
`;
const BoxAndButton = styled.div`
	width: 280px;
`;
const InputBox = styled.input`
	padding: 5px;
	border: solid black 2px;
	border-radius: 5px;
	width: 168px;
`;
const SubmitBtn = styled.input`
	margin: 0 4px 0 6px;
	height: 32px;
	width: 33px;
	border-radius: 50px;
`;
const Radio = styled.input``;
const Label = styled.label`
	font-size: 14px;
`;

export default Searchbox;
