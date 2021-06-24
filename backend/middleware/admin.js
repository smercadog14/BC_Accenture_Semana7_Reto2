const Role = require("../models/role");

const admin = async (req, res, next) => {
  const role = await Role.findById(req.user.roleId);

  if (!role) return res.status(401).send("Action Failed: cant find role");

  if (role.name === "admin") next();
  else return res.status(401).send("Action Failed: Unauthorized user");
};

module.exports = admin;
