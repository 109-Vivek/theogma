const { Router } = require("express");
const router = Router();

const { Event, GalleryEvent } = require("../db");



//get all the events of gallery page
router.get("/gallery",async (req, res) => {
  try {
    const galleryEvents = await GalleryEvent.find({});
    res.status(200).json({ galleryEvents : galleryEvents });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});
    

//get all the upcoming events events
router.get("/events",async (req, res) => {
  try {
    const events =await Event.find({});
    res.status(200).json({ events });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;