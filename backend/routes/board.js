const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Board = require("../models/board");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");
const Upload = require("../middleware/file");

router.post(
  "/saveTaskImg",
  Upload.single("image"),
  Auth,
  UserAuth,
  async (req, res) => {
    if (!req.body.name || !req.body.description)
      return res.status(401).send("Process failed: Incomplete data");

    if (req.file) {
      if (
        req.file.mimetype !== "image/png" &&
        req.file.mimetype !== "image/jpg" &&
        req.file.mimetype !== "image/jpeg" &&
        req.file.mimetype !== "image/gif"
      )
        return res.status(401).send("Accepte format: .png, .jpg, .jpeg, .gif");
    }

    const url = req.protocol + "://" + req.get("host");
    let imageUrl = "";
    if (req.file !== undefined && req.file.filename)
      imageUrl = url + "/uploads/" + req.file.filename;

    const board = new Board({
      userId: req.user._id,
      name: req.body.name,
      description: req.body.description,
      status: "to-do",
      imageUrl: imageUrl,
    });

    const result = await board.save();
    if (!result)
      return res.status(401).send("Process failed: Failed to register task");
    return res.status(200).send({ result });
  }
);

router.post("/saveTask", Auth, UserAuth, async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(401).send("Process failed: Incomplete data");

  const board = new Board({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    status: "to-do",
  });

  const result = await board.save();
  if (!result)
    return res.status(401).send("Process failed: Failed to register task");
  return res.status(200).send({ result });
});

router.get("/listTask", Auth, UserAuth, async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.user._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");
  const board = await Board.find({ userId: req.user._id });
  if (!board) return res.status(401).send("Process failed: No tasks to delete");
  return res.status(200).send({ board });
});

router.put("/updateTask", Auth, UserAuth, async (req, res) => {
  if (
    !req.body._id ||
    !req.body.name ||
    !req.body.status ||
    !req.body.description
  )
    return res.status(401).send("Process failed: Incomplete data");

  const validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");

  const board = await Board.findByIdAndUpdate(
    req.body._id,
    {
      userId: req.user._id,
      name: req.body.name,
      status: req.body.status,
      description: req.body.description,
    },
    { new: true }
  );
  if (!board) return res.status(401).send("Process failed: Task not found");
  return res.status(200).send({ board });
});

router.delete("/deleteTask/:_id", Auth, UserAuth, async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");
  const board = await Board.findByIdAndDelete(req.params._id);
  if (!board) return res.status(401).send("Process failed: Task not found");
  return res.status(200).send({ message: "Task deleted" });
});

module.exports = router;
