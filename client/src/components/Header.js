import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import styled from "styled-components";
import Profile from "./Profile";
import logo from "../assets/song-crawler-icon.svg";

const Header = () => {
	const { user } = useContext(SearchContext);

	return (
		<>
			<SongCrawlerAndUser>
				<SongCrawler to="/">
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
	background-color: var(--color-darkerBG);
	width: 100%;
	filter: drop-shadow(0 0 10px black);
`;
const SongCrawler = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	text-decoration: none;
	background-color: var(--color-darkerBG);
`;
const Icon = styled.img`
	height: 70px;
	width: auto;
	margin: 5px 10px;
	background-color: var(--color-darkerBG);
`;
const NamesAndMottoDiv = styled.div`
	display: flex;
	flex-direction: column;
	background-color: var(--color-darkerBG);
`;
const H1 = styled.h1`
	margin: 0 5px;
	font-size: 39px;
	background-color: var(--color-darkerBG);
	color: var(--color-brightText);
	font-weight: 300;
`;
const H2 = styled.h2`
	font-size: 14px;
	margin: 6px 0 0 72px;
	background-color: var(--color-darkerBG);
	color: var(--color-functionalGreen);
`;
const Auth = styled.div`
	margin: 0 20px;
	background-color: var(--color-darkerBG);
`;
const SearchboxDiv = styled.div`
	float: right;
	background-color: white;
	padding: 0 10px 12px 24px;
	border-bottom-left-radius: 5px;
`;
export default Header;
