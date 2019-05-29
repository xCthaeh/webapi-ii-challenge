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

router.get("/", (req, res) => {
  db.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The posts information could not be retrieved."
      });
    });
});

router.get("/:id", (req, res) => {
  const postid = req.params.id;
  db.findById(postid)
    .then(id => {
      if (id) {
        db.findById(postid).then(findId => {
          res.status(200).json(findId);
        });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The post information could not be retrieved."
      });
    });
});

router.put("/:id", (req, res) => {
  const { title, contents } = req.body;
  const postId = req.params.id;

  db.update(postId, { title, contents })
    .then(posts => {
      if (posts) {
        db.findById(postId).then(updatepost => {
          res.status(201).json(updatepost);
        });
      } else {
        res.status(404).json({ message: "no" });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The post information could not be modified."
      });
    });
});

router.delete("/:id", (req, res) => {
  const postid = req.params.id;
  db.remove(postid)
    .then(post => {
      if (post) {
        db.remove(postid).then(removepost => {
          res.status(201).json(removepost);
        });
      } else {
        res.status(404).json({
          error: err,
          mesage: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "The post could not be removed." });
    });
});

module.exports = router;
