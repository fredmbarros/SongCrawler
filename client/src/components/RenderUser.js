import styled from "styled-components";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const RenderUser = ({ avatar, isLoading, user, username }) => {
	if (!user) {
		if (isLoading) {
			return <div>Loading...</div>;
		} else {
			return (
				<>
					<LoginButton />
				</>
			);
		}
	} else {
		if (!username) {
			return <div>Loading USERNAME...</div>;
		} else {
			return (
				<Wrapper>
					<NameAndPicDiv>
						<NameAndLogoutBtn>
							<Name>{username}</Name>
							<LogoutButton />
						</NameAndLogoutBtn>
						<ProfilePic src={avatar} alt={username + "'s avatar"} />
					</NameAndPicDiv>
				</Wrapper>
			);
		}
	}
};

const Wrapper = styled.div`
	width: 100%;
	background-color: var(--color-darkerBG);
	padding: 4px 0 0 0;
`;
const NameAndPicDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: var(--color-darkerBG);
`;
const NameAndLogoutBtn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 0 0 0 14px;
	background-color: var(--color-darkerBG);
`;
const ProfilePic = styled.img`
	border-radius: 50%;
	border: solid 2px black;
	height: 45px;
	width: 45px;
	margin: 10px;
	background-color: var(--color-darkerBG);
`;
const Name = styled.p`
	font-size: 14px;
	font-weight: 500;
	margin: 0;
	background-color: var(--color-darkerBG);
`;

export default RenderUser;
