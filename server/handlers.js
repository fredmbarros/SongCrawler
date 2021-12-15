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

const getUser = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const { userId } = req.params; // how do I access the auth0 stuff from here?
	console.log(userId);
	let user = {};
	try {
		user = await db.collection("users").findOne({ userId });
		console.log(user);
		res.status(200).json({ status: 200, userId, user });
	} catch (err) {
		console.log(err);
		res.status(404).json({ status: 404, userId, user: "Not found" });
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

const addUser = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("songcrawler");
	if (!req.body.name || !req.body.email) {
		return res.status(400).json({ status: 400, data: "Name/email required" });
	}
	try {
		const user = {
			userId: req.body.email,
			name: req.body.name,
			email: req.body.email,
			songs: [],
			constellations: [],
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

const addSong = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	await client.connect();
	const db = client.db("songcrawler");
	try {
		const song = {
			songId: req.body.songId,
			userId: [req.body.email],
			notes: [],
			constellations: [],
		};
		const checkSong = await db
			.collection("songs")
			.findOne({ songId: song.songId });
		if (checkSong) {
			return res
				.status(400)
				.json({ status: 400, data: "This song has already been saved" });
		}
		const addingSong = await db.collection("songs").insertOne(song);
		res.status(201).json({ status: 201, data: req.body });
	} catch (err) {
		res.status(500).json({ status: 500, data: req.body, message: err.message });
	}
	client.close();
};

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
		const addingNote = db.collection("notes").insertOne(note);
		res.status(201).json({ status: 201, data: req.body });
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
				const songId = req.params.songId;
				console.log(songId);
				try {
					const result = await db.collection("songs").deleteOne({ songId });
					result.deletedCount > 0
						? res.status(200).json({ status: 200, data: songId, result })
						: res
								.status(400)
								.json({ status: 400, data: songId, message: "not found" });
				} catch (err) {
					res.status(500).json({ status: 500, data: songId, message: err.message });
				}
				client.close();
			};

module.exports = {
	getUser,
	getSong,
	getNote,
	addUser,
	addSong,
	addNote,
	deleteUser,
	deleteSong,
	updateUser,
	updateSong,
	updateNote
};