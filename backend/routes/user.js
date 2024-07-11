const { Router } = require("express");
const router = Router();

const { Event, GalleryEvent, Batch, Member } = require("../db");

//get all the events of gallery page
router.get("/gallery", async (req, res) => {
  try {
    const galleryEvents = await GalleryEvent.find({});
    res.status(200).json({ galleryEvents: galleryEvents });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

//get all the upcoming events events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json({ events });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/batches", async (req, res, next) => {
  try {
    const batches = await Batch.find();
    res.status(200).json(batches);
  } catch (err) {
    next(err);
  }
});

//get member by member id
router.post("/get-member", async (req, res, next) => {
  try {
    const { memberId } = req.body;
    const member = await Member.findById(memberId);
    if (!member) {
      res.status(404).json({ msg: "Member not found" });
      return;
    }
    res.status(200).json(member);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
