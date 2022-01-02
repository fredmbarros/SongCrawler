import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Profile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	useEffect(() => {
		if (user) {
			fetch("/users", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: user.email }),
			});
		}
	}, [user]);

	if (!user) {
		if (isLoading) {
			return <div>Loading...</div>;
		}
		return (
			<>
				<LoginButton />
			</>
		);
	} else {
		if (isLoading) {
			return <div>Loading...</div>;
		}

		return (
			<Wrapper>
				<NameAndPicDiv>
					<div>
						<Name>{user.name}</Name>
						<LogoutButton />
					</div>
					<ProfilePic src={user.picture} alt={user.name} />
				</NameAndPicDiv>
			</Wrapper>
		);
	}
};

const Wrapper = styled.div`
	border-bottom: solid 4px #960000;
	width: 100%;
`;
const NameAndPicDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 10px 0 0 0;
`;
const ProfilePic = styled.img`
	border-radius: 50%;
	border: solid 2px black;
	height: 45px;
	width: 45px;
	margin: 10px;
`;
const Name = styled.h2`
	font-size: 14px;
	margin: 0px 8px;
`;
export default Profile;
