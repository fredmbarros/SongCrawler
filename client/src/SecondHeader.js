import { useState, useContext } from "react";
import { SearchContext } from "./SearchContext";
import styled from "styled-components";
// import React from "react";
import logo from "./assets/song-crawler-icon.svg";
import Searchbox from "./Searchbox";
import Sidebar from "./Sidebar";

const SecondHeader = () => {
	return (
		<>
			<Head>
				<Sidebar />
				<Searchbox />
			</Head>
		</>
	);
};

const Head = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 10px;
`;
export default SecondHeader;
