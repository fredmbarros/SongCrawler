import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();

	return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};
const Button = styled.button`
	font-size: 14px;
	margin: 22px 12px 0 0;
	border: none;
	background-color: white;
	font-size: 10px;
	cursor: pointer;
	&:hover {
		border-radius: 5px;
		border: solid lightgrey 1px;
		bottom: 2px;
	}
`;
export default LoginButton;
