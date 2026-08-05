const { getProfile, updateProfile } = require("../controllers/user.controller");

const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const { signup, login } = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;
