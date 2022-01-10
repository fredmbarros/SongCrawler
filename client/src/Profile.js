import React, { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { SearchContext } from "./SearchContext";

const Profile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const {
		userId,
		setUserId,
		username,
		setUsername,
		email,
		setEmail,
		avatar,
		setAvatar,
	} = useContext(SearchContext);
	// newUserId and newUsername are set here as regular variables as a workaround to have them correctly assigned when creating a new user in the DB (due to React's asynchronous state variables)
	let newUserId;
	let newUsername;

	const createNewUserInDb = async () => {
		console.log(userId);
		console.log(newUserId);
		console.log(newUsername);

		await fetch("/users", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: newUserId,
				username: newUsername,
				email: user.email,
				avatar: user.picture,
			}),
		});
	};

	const currentUser = async () => {
		if (isAuthenticated) {
			// checking if user exists in db
			fetch("/users/" + user.email)
				.then((res) => res.json())
				.then((data) => {
					let { userInDb } = data;
					if (userInDb) {
						console.log("from db");
						setUserId(userInDb.userId);
						setUsername(userInDb.username);
						setEmail(userInDb.email);
						setAvatar(userInDb.avatar);

						// adding to localStorage to be used elsewhere
						window.localStorage.setItem("userId", userInDb.userId);
						window.localStorage.setItem("username", userInDb.name);
					} else {
						console.log("from auth0");
						newUserId = uuidv4();
						setUserId(newUserId);
						if (user.given_name) {
							newUsername = user.given_name;
						} else {
							newUsername = user.nickname;
						}
						setUsername(newUsername);
						setEmail(user.email);
						setAvatar(user.picture);

						// adding to localStorage
						window.localStorage.setItem("userId", newUserId);
						window.localStorage.setItem("username", newUsername);

						// adding new user to DB
						createNewUserInDb();
					}
				});
		}
	};

	useEffect(() => {
		currentUser();
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
		if (!username) {
			return <div>Loading...</div>;
		}

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
};

const Wrapper = styled.div`
	border-bottom: solid 4px #960000;
	width: 100%;
`;
const NameAndPicDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	// margin: 10px 0 0 0;
`;
const NameAndLogoutBtn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 0 0 0 14px;
`;
const ProfilePic = styled.img`
	border-radius: 50%;
	border: solid 2px black;
	height: 45px;
	width: 45px;
	margin: 10px;
`;
const Name = styled.p`
	font-size: 14px;
	font-weight: 500;
	margin: 0 0 0 0;
`;
export default Profile;
