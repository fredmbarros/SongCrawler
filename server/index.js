const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = 8000;
const app = express();
const {
    getFlights,
    getFlight,
    getReservations,
    addReservations,
    getSingleReservation,
    deleteReservation,
    updateReservation,
  } = require("./handlers");

app
  .use(express.json())
  .use(morgan("tiny"))
  .use(bodyParser.json())
//   .use(express.static("public"))
//   .use(express.urlencoded({ extended: false }))
//   .use("/", express.static(__dirname + "/"))

  // handle 404s
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))
  .listen(PORT, () => console.log(`Listening on port ${PORT}`))

.get("/", (req, res) => {
    res.status(200).json({status: "200", message: "home"})
})

