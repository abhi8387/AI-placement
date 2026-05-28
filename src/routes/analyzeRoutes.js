const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  analyzeResume,
} = require("../controllers/analyzeController");

router.post(
  "/resume",
  authMiddleware,
  analyzeResume
);

module.exports = router;