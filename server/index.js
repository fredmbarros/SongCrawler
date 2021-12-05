const path = require("path");
const express = require("express");

const PORT = 8000;

var app = express();

app.use(express.json())

.get("/", (req, res) => {
    res.status(200).json({status: "200", message: "home"})
})

const server = app.listen(PORT, function () {
	console.info("🌍 Listening on port " + PORT);
});
