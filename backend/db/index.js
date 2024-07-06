const mongoose = require("mongoose");
const db_url = process.env.DATABASE_URL;

// Connect to the MongoDB database
mongoose
  .connect(db_url)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

// schema for the SuperAdmin collection
const superAdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// schema for the Admin collection
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Schema for Member
const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageLink: {
    type: String,
    default: "",
  },
  linkedIn: {
    type: String,
    default: "not present",
  },
  github: {
    type: String,
    default: "not present",
  },
  batch: {
    type: String,
    required: true,
  },
});

//Schema for batch
const batchSchema = new mongoose.Schema({
  batchName: {
    type: Number,
    required: true,
    unique : true
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Members",
    },
  ],
});

// schema for the Event collection
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
  },
  imageLink: {
    type: String,
  },
  registerLink: {
    type: String,
  },
});

// schema for the GalleryEvent collection
const galleryEventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  images: {
    type: [String],
  },
});

// Create models based on the defined schemas
const Admin = mongoose.model("Admin", adminSchema);
const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema);
const Event = mongoose.model("Event", eventSchema);
const GalleryEvent = mongoose.model("GalleryEvent", galleryEventSchema);
const Member = mongoose.model("Member", memberSchema);
const Batch = mongoose.model("Batch", batchSchema);

module.exports = {
  Admin,
  SuperAdmin,
  Event,
  GalleryEvent,
  Member,
  Batch
};
