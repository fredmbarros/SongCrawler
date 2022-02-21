import { Link } from "react-router-dom";
import styled from "styled-components";

import GlobalStyles from "../GlobalStyles";

const RenderResults = ({ resultsToRender }) => {
	return (
		<Wrapper>
			<UL>
				{resultsToRender.map((item, index) => {
					return (
						<LI key={index}>
							<Result as={Link} to={item.result.api_path}>
								<IMG src={item.result.header_image_thumbnail_url} />
								<TitleAndArtist>{item.result.full_title}</TitleAndArtist>
							</Result>
						</LI>
					);
				})}
			</UL>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin: 40px;
`;
const UL = styled.ul`
	display: flex;
	flex-flow: row wrap;
	width: 70vw;
	align-items: flex-start;
	gap: 30px;
	justify-content: center;
`;

const LI = styled.li`
	margin: 10px;
	text-align: center;
	justify-content: center;
`;

const Result = styled.div`
	align-items: center;
	width: 100%;
	text-decoration: none; // ????
`;
const IMG = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 5px;
	filter: drop-shadow(0 12px 20px black);
`;

const TitleAndArtist = styled.p`
	margin-top: 14px;
	width: 8vw;
	// text-decoration: none; // ????
	position: relative;
`;

export default RenderResults;
