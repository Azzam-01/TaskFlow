const express = require("express");
const router = express.Router();

const {
  getProfile,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

// Get Profile
router.get("/profile", protect, getProfile);



module.exports = router;