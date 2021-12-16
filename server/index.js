"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

// import modules
const {
	getUser,
	getSong,
	getNote,
	addUser,
	addSong,
	addNote,
	updateUser,
	updateSong,
	deleteUser,
	deleteSong,
	updateNote,
} = require("./handlers");

const PORT = process.env.PORT || 8000;

express()
	.use(morgan("tiny"))
	.use(express.json())
	.use(express.static("public"))

	// endpoints
	.get("/users/:userId", getUser)
	.get("/users/songs/", getSong)
	.get("/notes/:noteId", getNote)
	.post("/users/", addUser)
	.post("/users/songs", addSong)
	.post("/notes", addNote)
	.put("/users/:userId", updateUser)
	.put("/songs/:songId", updateSong)
	.put("/notes/:noteId", updateNote)
	.delete("/users/songs/", deleteSong)
	.delete("/users/:userId", deleteUser)
	.get("*", (req, res) => {
		res.status(404).json({
			status: 404,
			message: "Error",
		});
	})

	.listen(8000, () => console.log(`Listening on port 8000`));
