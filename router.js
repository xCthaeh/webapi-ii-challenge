const express = require("express");
const router = express.Router();
const db = require("./data/db");
const cors = require("cors");

router.use(express.json());
server.use(cors());

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post."
    });
  } else {
    db.insert({ title, contents })
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          message: "There was an error while saving the post to the database."
        });
      });
  }
});
