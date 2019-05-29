const express = require("express");
const server = express();
const router = require("./router");

server.use(express.json());
server.use("/api/posts", router);

server.get("/", (req, res) => {
  res.send("One Ring to Rule them All");
});

module.exports = server;
