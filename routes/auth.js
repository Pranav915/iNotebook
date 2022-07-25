const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET;

var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

router.post(
  "/createuser", // Validation using Express Validator
  [
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 character long").isLength({
      min: 5,
    }),
    body("cpassword", "Password must be at least 5 character long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    //Using post because passwords involved
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() }); // See if the email isn't duplicate
    }
    try {
      if (req.body.password !== req.body.cpassword) {
        return res
          .status(400)
          .json({ success, errors: "Please re-enter password correctly." });
      }

      let user = await User.findOne({ email: req.body.email }); // await used beacuse it waits till it finds some match
      if (user) {
        return res
          .status(400)
          .json({ success, errors: "A user with this email already exists." });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post(
  "/login", // Login Authentication, checks through jwt
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //Using post because passwords involved
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() }); // See if the email isn't duplicate
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Incorrect Credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Incorrect Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      const userName = user.name;
      success = true;
      res.json({ success, authToken, userName });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// get user details, provided that the user is logged in
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
