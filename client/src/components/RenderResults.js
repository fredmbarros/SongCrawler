import { Link } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import GlobalStyles from "../GlobalStyles";

const RenderResults = ({ resultsToRender }) => {
	return (
		<Wrapper>
			<UL>
				{resultsToRender.map((item, index) => {
					// console.log(item.result.api_path);

					return (
						<LI key={uuidv4()}>
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
`;

const TitleAndArtist = styled.p`
	margin: 6px;
	width: 8vw;
	// text-decoration: none; // ????
	position: relative;
`;

export default RenderResults;
