const express = require("express");
const router = express.Router();
const Role = require("../models/role");
const mongoose = require("mongoose");
const Admin = require("../middleware/admin");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");

router.post("/registerRole", Auth, UserAuth, Admin, async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(401).send("Process failed: Incomplete data");

  const roleExists = await Role.findOne({ name: req.body.name });
  if (roleExists)
    return res.status(401).send("Process failed: role already exists");

  const role = new Role({
    name: req.body.name,
    description: req.body.description,
    active: true,
  });

  const result = await role.save();
  if (!result) return res.status(401).send("Failed to register role");
  return res.status(200).send({ result });
});

router.get("/listRole", Auth, UserAuth, Admin, async (req, res) => {
  const role = await Role.find();
  if (!role) return res.status(401).send("No role");
  return res.status(200).send({ role });
});

router.put("/updateRole", Auth, UserAuth, Admin, async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.description)
    return res.status(401).send("Process failed: Incomplete data");

  const role = await Role.findByIdAndUpdate(
    req.body._id,
    {
      name: req.body.name,
      description: req.body.description,
      active: req.body.active,
    },
    { new: true }
  );
  if (!role) return res.status(401).send("Process failed: Error editing Role");

  return res.status(200).send({ role });
});

router.delete("/deleteRole/:_id", Auth, UserAuth, Admin, async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");
  const roles = await Role.findByIdAndDelete(req.params._id);
  if (!roles) return res.status(401).send("Failed to delete Role");
  return res.status(200).send({ message: "Role deleted" });
});

router.put("/deleteRole", Auth, UserAuth, Admin, async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.description)
    return res.status(401).send("Process failed: Incomplete data");

  let active;

  if (req.body.active) {
    active = false;
  } else {
    active = true;
  }

  const role = await Role.findByIdAndUpdate(
    req.body._id,
    {
      name: req.body.name,
      description: req.body.description,
      active: active,
    },
    { new: true }
  );
  if (!role) return res.status(401).send("Process failed: Error editing Role");

  return res.status(200).send({ role });
});

module.exports = router;
