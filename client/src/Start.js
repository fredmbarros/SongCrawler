import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SearchContext } from "./SearchContext";
import styled from "styled-components";
import Header from "./Header";
import Searchbox from "./Searchbox";

const Start = () => {
	const { category, user } = useContext(SearchContext);
	const navigate = useNavigate();

	useEffect(() => {
		navigate("./home");
	}, []);

	return <p>Loading</p>;
};
export default Start;
