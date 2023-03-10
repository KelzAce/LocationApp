const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controller/userController");
const router = express.Router();

router.get("/", userControllers.getUsers);

router.post(
  "/signup",
  [check("name").not().isEmpty(), 
  check("email").normalizeEmail().isEmail()
  check("password").isLength({min: 6})

],
  userControllers.signup
);

router.post("/login", userControllers.login);

// router.delete("./:pid", placesControllers.deletePlaceById);

module.exports = router;
