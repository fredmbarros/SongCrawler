import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import AddToLists from "./AddToLists";

const Constellations = () => {
	// fetch Constellations people have made (in BE)
	// fetch suggestions from API

	return (
		<h2>Constellation title</h2>
		// map
		// each song can receive upvote or downvote according to how it fits in the list
		// stretching the stretch: song names are scattered in space and have colored lines tying them - each line corresponds to one of the possible links (beat, melody, harmony, timbre)
        // each song can be clicked to check or saved right away (strecthing the streched strech: or even saved to another constellation directly from there)
	);
};
