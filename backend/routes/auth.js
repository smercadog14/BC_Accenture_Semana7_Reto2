const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Auth = require("../middleware/auth");
const Role = require("../models/role");

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect email or password");

  const hash = await bcrypt.compare(req.body.password, user.password);
  if (!user.active || !hash)
    return res.status(400).send("Incorrect email or password");

  try {
    const jwtToken = user.generateJWT();
    return res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Login error");
  }
});

router.get("/admin", Auth, async (req, res) => {
  const roleReq = req.user.roleId;

  const roleDb = await Role.findById(roleReq);

  if (roleDb.name === "admin") {
    return res.status(200).send({ admin: true });
  }
  return res.status(200).send({ admin: false });
});

module.exports = router;
