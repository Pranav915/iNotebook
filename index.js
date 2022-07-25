const connectToMongo = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
var cors = require("cors");

// include dotenv
dotenv.config();

app.use(cors());

const PORT = process.env.PORT || parseInt(process.env.API_PORT);

connectToMongo();
app.use(express.json());

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`iNotebook backend listening on port ${PORT}`);
});
