import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import SearchResults from "./SearchResults";
import Searchbox from "../Searchbox";

const Start = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	// loading state
	const [status, setStatus] = useState(null);

	return (
		<Wrapper>
			<SearchElement>
				<Form>
					<BoxDiv>
						<Searchbox />
					</BoxDiv>
				</Form>
			</SearchElement>
		</Wrapper>
	);
};

const Wrapper = styled.div``;
const SearchElement = styled.div`
	width: 100vw;
	height: 100vh;
	// background-image: linear-gradient(var(--color-BgGradientStart), black);
`;
const Form = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 30vh 0;
`;
const BoxDiv = styled.div`
	// padding: 6px 10px;
	// background-color: #1f2124;
	// border-radius: 5px;
	// box-shadow: 0 4px 12px 1px #3e4042;
`;
const Tabs = styled.div`
	display: flex;
`;
const Tab = styled.button`
	margin: 10px;
`;
const CategHead = styled.button``;

export default Start;
