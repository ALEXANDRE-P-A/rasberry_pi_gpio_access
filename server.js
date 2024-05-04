require("dotenv").config();

const express = require("express");
const http = require("http");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.set("view engine", "ejs");
app.use("/resources", express.static(path.join(__dirname, "/resources")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("./index.ejs");
});

app.get("/app", (req, res) => {
  res.render("./app.ejs");
});


io.on("connection", socket => {
  console.log("User connected ...");
  socket.on("request", input => {
    console.log(input);
    io.emit("request", input);
  });
});

server.listen(PORT, _ => {
  console.log(`Application listening at http://127.0.0.1:${PORT}`);
});