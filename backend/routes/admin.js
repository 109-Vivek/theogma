const { Router } = require("express");
const router = Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { authorizeAdmin } = require("../middlewares/admin");
const adminJWTSecret = process.env.ADMIN_JWT_SECRET;

const { Admin, GalleryEvent, Event } = require("../db");


const fs = require("fs");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const multer = require("multer");




// Multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/temp/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

// Signin
router.post("/sign-in", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) {
    res.json("Mess Admin Not Found");
    return;
  } else {
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      res.json("Invalid Username or password");
      return;
    }

    const token = jwt.sign({ username, password }, adminJWTSecret);
    res.json({ token });
  }
});

// Create a new gallery event with images
// Steps:
// 1. User will select the images to be uploaded and make a post request to the server
// 2. The server will receive the images and store them in a temporary folder using multer
// 3. The server will then send the images to the cloudinary server
// 4. The cloudinary server will store the images and return the image links
// 5. The server will store the image links in the database
// 6. The server will then send the image links to the user
// 7. The user will then use the image links to display the images
router.post(
  "/create-gallery-event",
  authorizeAdmin,
  upload.array("photos", 30),
  async (req, res) => {
    const images = req.files;
    const name = req.body.name;
    const imageUrlPromise = [];

    images.forEach((image) => {
      const promise = uploadOnCloudinary(image.path);
      imageUrlPromise.push(promise);
    });

    const response = await Promise.all(imageUrlPromise);
    console.log(response);

    const galleryEvent = await GalleryEvent.create({
      name: name,
      images: response,
    });
    res.status(200).json({ msg: "Gallery Event Created Successfully" });
  }
);

// Create an upcoming event
router.post(
  "/create-event",
  authorizeAdmin,
  upload.single("event-image"),
  async (req, res) => {
    const { name, description, registerLink } = req.body;
    const imageLink = await uploadOnCloudinary(req.file.path);
    const upcomingEvent = await Event.create({
      name,
      description,
      registerLink,
      imageLink,
    });
    res.status(200).json({ msg: "Event Created Successfully" });
  }
);

module.exports = router;
