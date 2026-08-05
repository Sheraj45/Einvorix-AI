const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const { chat } = require("../controllers/chat.controller");

router.post("/", protect, chat);

module.exports = router;
