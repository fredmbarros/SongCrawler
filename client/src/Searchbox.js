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
		isHovering,
		setIsHovering,
		handleMouseOut,
		handleMouseOver,
	} = useContext(SearchContext);

	let navigate = useNavigate();

	const handleSubmit = (ev) => {
		// the idea here is to avoid an empty search, but it's not working properly
		if (!searchTerm) {
			console.log(searchTerm);
			void 0;
		} else {
			localStorage.setItem("searchTerm", searchTerm);
			navigate("./results");
		}
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
					placeholder="Song search"
					onChange={(ev) => setSearchTerm(ev.target.value)}
				/>
				<SubmitBtn type="submit" name="SubmitBtn" value="Go" />
			</BoxAndButton>
		</Form>
	);
};

const Form = styled.form`
	margin: 4px;
	border-radius: 10px;
	border-top: solid 1px var(--color-greyedOutText);
	border-left: solid 0.5px var(--color-greyedOutText);
	border-bottom: solid 1px black;
	border-right: solid 1px black;
	background-color: var(--color-darkerBG);
	filter: drop-shadow(0 12px 20px black);
	padding: 2px;
`;
const BoxAndButton = styled.div`
	width: 355px;
	display: flex;
	align-items: center;
	border-top: #1f2124 1px solid;
`;
const InputBox = styled.input`
	padding: 5px;
	margin: 4px 4px 4px 7px;
	border: solid black 2px;
	border-radius: 5px;
	width: 300px;
`;
const SubmitBtn = styled.input`
	margin: 0 4px 0 4px;
	height: 33px;
	width: 33px;
	border-radius: 50px;
	position: relative;
	color: black;
	background-color: lightgrey;
	// border: 1px grey solid;
	border-top: 2px white solid;
	border-left: 1px white solid;

	&:hover {
		cursor: pointer;
	}
	&:active {
		filter: drop-shadow(0 0 -6px #1f2124);
		border-top: 2px grey solid;
		border-left: 1px grey solid;

		// height: 31px;
		// width: 31px;
	}
`;
export default Searchbox;
