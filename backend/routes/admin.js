const { Router } = require("express");
const router = Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { authorizeAdmin } = require("../middlewares/admin");
const adminJWTSecret = process.env.ADMIN_JWT_SECRET;

const { Admin, GalleryEvent, Event, Member, Batch } = require("../db");

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
    res.json("Invalid Username");
    return;
  } else {
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      res.json("Incorrect Password");
      return;
    }

    const token = jwt.sign({ username, password }, adminJWTSecret);
    res.json({ token });
  }
});

// Image handling uisng multer and cloudinary:
// 1. User will select the images to be uploaded and make a post request to the server
// 2. The server will receive the images and store them in a temporary folder using multer
// 3. The server will then send the images to the cloudinary server
// 4. The cloudinary server will store the images and return the image links
// 5. The server will store the image links in the database
// 6. The server will then send the image links to the user
// 7. The user will then use the image links to display the images

// Create a new gallery event with images
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

    const galleryEvent = await GalleryEvent.create({
      name: name,
      images: response,
    });
    res.status(200).json({ msg: "Gallery Event Created Successfully" });
  }
);

//delete gallery event
router.delete("/delete-gallery-event", authorizeAdmin, async (req, res) => {
  try {
    const { galleryEventId } = req.body;
    const galleryEvent = await GalleryEvent.findById(galleryEventId);
    if (!galleryEvent) {
      res.status(404).json({ msg: "Gallery Event not found" });
      return;
    }
    const deleted = await GalleryEvent.findByIdAndDelete(galleryEventId);
    res.status(200).json({ msg: "Gallery Event Deleted Successfully" });
  } catch (err) {
    next(err);
  }
});

// Create an upcoming event
router.post(
  "/create-event",
  authorizeAdmin,
  upload.single("eventImage"),
  async (req, res, next) => {
    try {
      const { name, description, registerLink } = req.body;
      const imageLink = await uploadOnCloudinary(req.file.path);
      const upcomingEvent = await Event.create({
        name,
        description,
        registerLink,
        imageLink,
      });
      res.status(200).json({ msg: "Event Created Successfully" });
    } catch {
      next(err);
    }
  }
);

//Delete upcoming event
router.delete("/delete-event", authorizeAdmin, async (req, res, next) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ msg: "Event not found" });
      return;
    }
    const deleted = await Event.findByIdAndDelete(eventId);
    res.status(200).json({ msg: "Event Deleted Successfully" });
  } catch (err) {
    next(err);
  }
});

//Create a new batch
router.post("/create-batch", authorizeAdmin, async (req, res, next) => {
  try {
    const { batchName } = req.body;

    const batchExists = await Batch.findOne({ batchName });
    if (batchExists) {
      res.status(400).json({ msg: "Batch Already Exists" });
      return;
    }
    const batch = await Batch.create({ batchName });
    res.status(200).json({ msg: "Batch Created Successfully" });
  } catch (err) {
    next(err);
  }
});

//Delete a batch - also delete all the members
router.delete("/delete-batch", authorizeAdmin, async (req, res, next) => {
  try {
    const { batchId } = req.body;
    const batch = await Batch.findById(batchId);
    console.log(batch);
    if (!batch) {
      res.status(404).json({ msg: "Batch not found" });
      return;
    }
    //delete the batch
    const deletedBatch = await Batch.findByIdAndDelete(batchId);
    //delete all the members of the batch
    const deleted = await Member.deleteMany({ batch: batch.batchName });
    res.status(200).json({ msg: "Batch Deleted Successfully" });
  } catch (err) {
    next(err);
  }
});

//Add member to batch
router.post(
  "/add-member",
  authorizeAdmin,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const { name, linkedIn, github, batchId } = req.body;
      const batch = await Batch.findById(batchId);
      if(!batch){
        res.status(404).json({msg: "Batch not found"});
        return;
      }
      const imageLink = await uploadOnCloudinary(req.file.path);
      const member = await Member.create({
        name,
        imageLink,
        linkedIn,
        github,
        batch : batch.batchName
      });
      batch.members.push(member._id); 
      await batch.save();
      res.status(200).json({ msg: "Member Added Successfully" });
    } catch (err) {
      next(err);
    }
  }
);

//delete member from batch
router.delete("/delete-member", authorizeAdmin, async (req, res,next) => {
  try {
    const { memberId } = req.body;
    const member = await Member.findById(memberId);

    if (!member) {
      res.status(404).json({ msg: "Member not found" });
      return;
    }

    //delete from batch
    const batch = await Batch.findOne({batchName : member.batch});
    const index = batch.members.indexOf(memberId);
    batch.members.splice(index, 1); 
    await batch.save();

    //delete member
    const deleted = await Member.findByIdAndDelete(memberId);
    res.status(200).json({ msg: "Member Deleted Successfully" });
  } catch (err) {
    next(err);
  }
});

//get members

module.exports = router;
