const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Builtin Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Cookie Parser
app.use(cookieParser());
app.use(express.static(__dirname + "/client"));
app.use("/static", express.static(__dirname + "/static"));

// Templating Engine set
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

require("./startup/routes")(app);
require("./startup/db")();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on Port ${PORT}...`));
