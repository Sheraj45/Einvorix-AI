const express = require("express");
const { version } = require("mongoose");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    project: "Einvorix",
    version: "1.0.0",
    status: "Server is healthy",
  });
});

module.exports = router;
