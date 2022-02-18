import React, { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuidv4 } from "uuid";

import { AppContext } from "../AppContext";
import RenderUser from "./RenderUser";

const Profile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const { currentUserSavedSongs, setCurrentUserSavedSongs } =
		useContext(AppContext);
	let userId;
	let username;
	let email;
	let avatar;
	let songs;
	const [renderUsername, setRenderUsername] = useState();
	const [renderAvatar, setRenderAvatar] = useState();

	const currentUser = async () => {
		if (isAuthenticated) {
			// checking if user exists in db THROUGH EMAIL (userId doesn't exist when you have a new user)
			const checkEmail = await fetch("/users/email/" + user.email);
			const response = await checkEmail.json();
			const { userInDb } = response;
			if (userInDb) {
				console.log("user in db");
				userId = userInDb.userId;
				username = userInDb.username;
				email = userInDb.email;
				avatar = userInDb.avatar;
				songs = userInDb.songs;
				setCurrentUserSavedSongs(songs);
			} else {
				console.log("from auth0");
				userId = uuidv4();
				user.given_name
					? (username = user.given_name)
					: (username = user.nickname);
				email = user.email;
				avatar = user.picture;
				songs = [];
				setCurrentUserSavedSongs(songs);
				// adding new user to DB
				await fetch("/users", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						userId,
						username,
						email,
						avatar,
						songs,
					}),
				});
			}
			// adding current user info to state to be used in RenderUser -> Header
			setRenderUsername(username);
			setRenderAvatar(avatar);
			// adding current user's saved songs array to AppContext so that it can be used elsewhere
			// const tempArr = currentUserSavedSongs;
		}
	};

	useEffect(() => {
		currentUser();
	}, [user]);

	return (
		<RenderUser
			avatar={renderAvatar}
			username={renderUsername}
			user={user}
			isLoading={isLoading}
		/>
	);
};

export default Profile;
