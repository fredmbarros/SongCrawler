import { useState, useContext } from "react";
import { SearchContext } from "./SearchContext";
import styled from "styled-components";
import Profile from "./Profile";
import logo from "./assets/song-crawler-icon.svg";

const Header = () => {
	const { user } = useContext(SearchContext);

	return (
		<>
			<SongCrawlerAndUser>
				<SongCrawler>
					<Icon src={logo} />
					<NamesAndMottoDiv>
						<H1>Song Crawler</H1>
						<H2>True music discovery</H2>
					</NamesAndMottoDiv>
				</SongCrawler>
				<Auth>
					<Profile />
				</Auth>
			</SongCrawlerAndUser>
		</>
	);
};

const SongCrawlerAndUser = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 8px;
	border-bottom: solid 4px #960000;
	background-color: white;
	color: black;
	font-family: "Helvetica";
`;
const SongCrawler = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
`;
const Icon = styled.img`
	height: 70px;
	width: auto;
	margin: 5px 10px;
`;
const NamesAndMottoDiv = styled.div`
	display: flex;
	flex-direction: column;
`;
const H1 = styled.h1`
	margin: 0 5px;
	font-family: var(--font-heading);
	margin-bottom: 0px;
`;
const H2 = styled.h2`
	font-size: 14px;
	margin: 5px 0 0 66px;
`;
const Auth = styled.div`
	margin: 0 20px;
	font-family: var(--font-body);
`;
const SearchboxDiv = styled.div`
	float: right;
	background-color: white;
	padding: 0 10px 12px 24px;
	border-bottom-left-radius: 5px;
`;
export default Header;
