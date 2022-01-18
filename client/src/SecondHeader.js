import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Searchbox from "./Searchbox";
import Sidebar from "./Sidebar";

const SecondHeader = () => {
	const { pathname } = useLocation();
	return (
		<>
			<Head>
				<Sidebar />
				{pathname !== "/" && <Searchbox />}
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
