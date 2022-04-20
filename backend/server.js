// Express application
var express = require("express");

var cors = require("cors");

// Application variable
var app = express();
app.use(cors());
app.use(express.json());

// Routes
var infoRoute = require("./routes/infoRoute");
app.use("/api/info", infoRoute);

// Port
var port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening port ${port}`));
