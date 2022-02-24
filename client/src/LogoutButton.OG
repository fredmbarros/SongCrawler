import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
	const { logout } = useAuth0();

	return (
		<Button onClick={() => logout({ returnTo: window.location.origin })}>
			Log Out
		</Button>
	);
};
const Button = styled.button`
	border: none;
	margin: 2px;
	padding: 0;
	background-color: white;
	font-size: 10px;
	border-radius: 5px;
	cursor: pointer;
	&:hover {
		border-radius: 5px;
		border: solid lightgrey 1px;
	}
`;
export default LogoutButton;
