const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/users", async (req, res) => {
  req.body.role = "user";
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/users/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id).exec()
        user = user.toObject()
        delete user.tokens
        delete user.password
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

router.post("/users/logout", async (req, res) => {
  try {
    res.send("Logout Successfully");
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
