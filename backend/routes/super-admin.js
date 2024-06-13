const { Admin, SuperAdmin} = require("../db/index");
const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authorizeSuperAdmin } = require("../middlewares/superadmin");
const superAdminJWTSecret = process.env.SUPER_ADMIN_JWT_SECRET;

//Signin
router.post("/sign-in", async (req, res) => {
  const { username, password } = req.body;
  const superAdmin = await SuperAdmin.findOne({ username });
  if (!superAdmin) {
    res.json("Invalid Username");
    return;
  } else {
    const match = await bcrypt.compare(password, superAdmin.password);
    if (!match) {
      res.json("Incorrect Password");
      return;
    }

    const token = jwt.sign({ username, password }, superAdminJWTSecret);
    res.json({ token });
  }
});

//create admin
router.post("/create-admin", authorizeSuperAdmin, async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ name, username, password : hashedPassword});
    newAdmin.save();
    res.status(200).json({ msg: "Admin Created Successfully" });
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

//get list of admins
router.get("/list-admins", authorizeSuperAdmin, async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json({ admins: admins });
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

//delete a mess
router.delete("/delete-admin", authorizeSuperAdmin, async (req, res) => {
  try {
    const { adminId } = req.body;
    const messAdmin = await Admin.findOne({ _id: adminId });
    if (!messAdmin) {
      res.status(404).json({ msg: "Admin not found" });
      return;
    }
    const adminDeleted = await Admin.findByIdAndDelete(adminId);
    res.status(200).json({ msg: "Admin Deleted Successfully" });
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
