const express = require("express");
const Course = require("../models/course");
const router = new express.Router();

router.post("/course", async (req, res) => {
  try {
    const course = new Course({
      ...req.body,
    });
    try {
      await course.save();
      res.status(201).send(course);
    } catch (e) {
      res.status(400).send(e);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/course", async (req, res) => {
  try {
    let course = await Course.find().exec();
    await res.send(course);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/course/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const course = await Course.findOne({ _id });
    if (!course) {
      return res.status(404).send();
    }
    return res.send(course);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/course/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const course = await Course.findOne({ _id: req.params.id });
    if (!course) {
      return res.status(404).send();
    }

    updates.forEach((update) => (course[update] = req.body[update]));
    await course.save();
    res.send(course);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/course/:id", async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id });
    if (!course) {
      res.status(404).send();
      return null;
    }
    await course.remove();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
