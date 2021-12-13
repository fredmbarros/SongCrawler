import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Profile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		isAuthenticated && (
			<NameAndPicDiv>
				<div>
					<Name>{user.name}</Name>
				</div>
				<ProfilePic src={user.picture} alt={user.name} />
			</NameAndPicDiv>
		)
	);
};

const NameAndPicDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 10px 0 0 0;
`;
const ProfilePic = styled.img`
	border-radius: 50%;
	height: 45px;
	width: 45px;
	margin: 10px;
`;
const Name = styled.h2`
	font-size: 14px;
	margin: 0px 8px;
`;
export default Profile;
