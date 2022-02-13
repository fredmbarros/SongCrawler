"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

// import modules
const {
	// new
	saveSong,
	getUserByEmail,
	getSongInDbByApiId,
	getUser,
	// old
	getNote,
	addUser,
	addSongToUser,
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
	// new
	.post("/songs", saveSong)
	.get("/users/email/:email", getUserByEmail)
	.get("/songs/songInDbByApiId/:geniusId", getSongInDbByApiId)
	.get("/users/:userId", getUser)
	// .get("/songs/:songId", getSongInDb)
	// old
	.get("/notes/:noteId", getNote)
	.post("/users/", addUser)
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

	.listen(PORT, () => console.log(`Listening on port ${PORT}`));
