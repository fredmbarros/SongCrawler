"use strict";

const { MongoClient } = require("mongodb");
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

// new handlers
const saveSong = async (req, res) => {
	// saveSong, 1, adds the song to the DB + adds user to song^* OR adds user to existing song in DB; 2, adds song to user
	//* Songs have an array listing the users that saved them. I have no use for it now, but it may come in handy down the road.

	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("songcrawler");
	const songs = db.collection("songs");
	const users = db.collection("users");
	// querying song by artist and title - better not to depend on songIdGenius
	const query = {
		artistName: req.body.artistName,
		songTitle: req.body.songTitle,
	};

	try {
		// saveSong pt. 1 - working on SONG
		const songInDb = await songs.findOne(query, options);

		if (!songInDb) {
			// creating song in DB
			const addSongToDb = {
				songId: req.body.songId,
				songIdGenius: req.body.songIdGenius,
				songTitle: req.body.songTitle,
				artistName: req.body.artistName,
				the: req.body.the,
				users: [req.body.userId],
				constellation: [],
			};
			await songs.insertOne(addSongToDb);
			res
				.status(200)
				.json({ status: 200, data: "Song added to DB and user added to song" });
		} else {
			// checking if userId is in song.users
			if (songInDb.users.includes(req.body.userId)) {
				return res
					.status(200)
					.json({ status: 200, data: "userId already in song.users" });
			}
			// adding user to existing song in DB
			await songs.updateOne(query, { $push: { users: req.body.userId } });
			res.status(200).json({ status: 200, data: "userId added to song.users" });
		}

		// saveSong pt. 2 - working on USER
		const user = await users.findOne({ userId: req.body.userId });
		// just to be sure, if user doesn't exist:
		if (!user) {
			return res.status(400).json({ status: 400, data: "User doesn't exist" });
		} else {
			// user existing, update it inserting songId into its "songs" array
			await users.updateOne(
				{ userId: req.body.userId },
				{ $push: { songs: req.body.songId } }
			);
			return res
				.status(200)
				.json({ status: 200, data: "Song added to user.songs" });
		}
	} catch (err) {
		res.status(500).json({ status: 500, data: req.body, message: err.message });
	}
	client.close();
};

// I need a separate getUserByEmail bc even though userIds have to be consistent so that I can add them to notes, songs, constellations etc., emails can be changed upon user's request. At the same time, when checking a new user, email is the only thing consistent I have in advance, as it's more unique than name - but of course anyone can create new accounts with different emails, as it happens everywhere
const getUserByEmail = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("songcrawler");
	const { email } = req.params;
	console.log("req.params:");
	console.log(req.params);
	// let userInDb = {};
	try {
		const userInDb = await db.collection("users").findOne({ email });
		console.log("userInDb:");
		console.log(userInDb);
		res.status(200).json({ status: 200, userInDb });
	} catch (err) {
		res.status(404).json({ status: 404, userInDb: "Error" });
	} finally {
		client.close();
	}
};

const getSongInDb = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("songcrawler");
	const songs = db.collection("songs");
	const { songId } = req.params;
	console.log(songId);
	let songBySongId;
	let songByNameAndTitle;
	try {
		songBySongId = await songs.findOne({ songId });
		console.log(songBySongId);
		if (!songBySongId) {
			songByNameAndTitle = await songs.findOne({ })
		}
		res.status(200).json({ status: 200, songId, song });
	} catch (err) {
		console.log(err);
		res.status(404).json({ status: 404, songId, song: "Not found" });
	} finally {
		client.close();
	}
};

// to be revised when DB works again
const addNote = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("songcrawler");
	try {
		const note = {
			noteId: req.body.noteId,
			songId: req.body.songId,
			userId: req.body.userId,
			content: req.body.note,
		};
		const addingNote = db.collection("songs").insertOne(note);
		res.status(201).json({ status: 201, data: req.body });
	} catch (err) {
		res.status(500).json({ status: 500, data: req.body, message: err.message });
	}
	client.close();
};

// old handlers
const getUser = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("songcrawler");
	const { userId } = req.params;
	console.log("req.params:");
	console.log(req.params);
	// let userInDb = {};
	try {
		const userInDb = await db.collection("users").findOne({ userId });
		console.log("userInDb:");
		console.log(userInDb);
		res.status(200).json({ status: 200, userInDb });
	} catch (err) {
		res.status(404).json({ status: 404, userInDb: "Error" });
	} finally {
		client.close();
	}
};

const getSong = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("songcrawler");
	const { songId } = req.params;
	console.log(songId);
	let song = {};
	try {
		song = await db.collection("songs").findOne({ songId });
		console.log(song);
		res.status(200).json({ status: 200, songId, song });
	} catch (err) {
		console.log(err);
		res.status(404).json({ status: 404, songId, song: "Not found" });
	} finally {
		client.close();
	}
};

const getNote = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const { noteId } = req.params;
	console.log(userId);
	let note = {};
	try {
		note = await db.collection("notes").findOne({ noteId });
		console.log(user);
		res.status(200).json({ status: 200, userId, user });
	} catch (err) {
		console.log(err);
		res.status(404).json({ status: 404, userId, user: "Not found" });
	} finally {
		client.close();
	}
};
// updated
const addUser = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("songcrawler");
	if (!req.body.email) {
		return res.status(400).json({ status: 400, data: "Email required" });
	}
	try {
		const user = {
			userId: req.body.userId,
			username: req.body.username,
			email: req.body.email,
			avatar: req.body.avatar,
			songs: [],
			notes: [],
		};
		const checkUser = await db
			.collection("users")
			.findOne({ email: user.email });
		if (checkUser) {
			return res.status(400).json({ status: 400, data: "User already exists" });
		}
		const addingUser = await db.collection("users").insertOne(user);
		res.status(201).json({ status: 201, data: req.body });
	} catch (err) {
		res.status(500).json({ status: 500, data: req.body, message: err.message });
	}
	client.close();
};

const addSongToUser = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("songcrawler");
	if (!req.body.userId || !req.body.songId) {
		return res.status(400).json({ status: 400, data: "Email/songId required" });
	}
	try {
		// adding song to user
		console.log(req.body.songId);
		const queryUserId = { userId: req.body.userId };
		const querySongId = { songId: req.body.songId };
		const checkUser = await db.collection("users").findOne(queryUserId);
		console.log(checkUser.songs);
		// if (!checkUser) {
		// 	return res.status(400).json({ status: 400, data: "User not found" });
		// }
		// // CHECK BELOW
		// if (!checkUser.songs.findOne(querySongId)) {
		// 	checkUser.songs.push(req.body.songId);
		// }
		// const songs = checkUser.songs;
		// const newValues = { $set: { songs } };
		// await db.collection("users").updateOne(query, newValues);
		// res.status(201).json({ status: 201, data: req.body });
	} catch (err) {
		res.status(500).json({ status: 500, data: req.body, message: err.message });
	}
	client.close();
};


const updateUser = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("songcrawler");
	const userId = req.params.userId;

	try {
		// HAVE TO CHECK IF IT'S REALLY ADDING A SONG, AND NOT SUBSTITUTING ONE FOR THE OTHER
		const updatingUser = await db
			.collection("users")
			.updateOne({ userId }, { $set: req.body });
		res
			.status(201)
			.json({ status: 201, data: userId, message: "updated succesfully" });
	} catch (err) {
		res.status(500).json({ status: 500, data: userId, message: err.message });
	}
	client.close();
};

const updateSong = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("songcrawler");
	const songId = req.params.songId;

	try {
		const result = await db
			.collection("songs")
			.updateOne({ songId }, { $set: req.body });
		res
			.status(201)
			.json({ status: 201, data: songId, message: "updated succesfully" });
	} catch (err) {
		res.status(500).json({ status: 500, data: songId, message: err.message });
	}
	client.close();
};
const updateNote = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("songcrawler");
	const songId = req.params.songId;

	try {
		const result = await db
			.collection("songs")
			.updateOne({ songId }, { $set: req.body });
		res
			.status(201)
			.json({ status: 201, data: songId, message: "updated succesfully" });
	} catch (err) {
		res.status(500).json({ status: 500, data: songId, message: err.message });
	}
	client.close();
};

// const getConstellation = async (req, res) => {
// 	const client = await new MongoClient(MONGO_URI, options);
// 	await client.connect();
// 	const songs = await db.collection("songs").find({}).toArray();
// 	if (constellations.length > 0) {
// 		res.status(200).json({ status: 200, constellations });
// 	} else {
// 		res.status(200), json({ status: 200, message: "No constellations found" });
// 	}
// 	client.close();
// };

const deleteUser = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("songcrawler");
	const userId = req.params.userId;
	console.log(userId);
	try {
		const result = await db.collection("users").deleteOne({ userId });
		result.deletedCount > 0
			? res.status(200).json({ status: 200, data: userId, result })
			: res
					.status(400)
					.json({ status: 400, data: userId, message: "not found" });
	} catch (err) {
		res.status(500).json({ status: 500, data: userId, message: err.message });
	}
	client.close();
};

const deleteSong = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("songcrawler");
	console.log(req.body);
	if (!req.body.userId || !req.body.songId) {
		return res.status(400).json({ status: 400, data: "Email/songId required" });
	}
	try {
		const userId = req.body.userId;
		console.log("userId:");
		console.log(userId);
		const query = { userId };
		console.log("query:");
		console.log(query);
		const checkUser = await db
			.collection("users")
			.findOne({ userId: req.body.userId });
		console.log(checkUser);
		if (!checkUser) {
			return res.status(400).json({ status: 400, data: "User not found" });
		}
		let songs = checkUser.songs.find((song) => {
			if (song !== req.body.songId) return song;
		});
		if (!songs) {
			songs = [];
		}
		let newValues = { $set: { songs } };
		await db.collection("users").updateOne(query, newValues);
		res.status(201).json({ status: 201, data: req.body });
	} catch (err) {
		res.status(500).json({ status: 500, data: req.body, message: err.message });
	}
	client.close();
};

module.exports = {
	// new handlers
	saveSong,
	// old handlers
	getUser,
	getUserByEmail,
	getSong,
	getNote,
	addUser,
	addSongToUser,
	addNote,
	deleteUser,
	deleteSong,
	updateUser,
	updateSong,
	updateNote,
};
