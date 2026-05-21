const imageController = require("../controllers/image.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const imageRouter = express.Router();

imageRouter.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  upload.single("file"),
  imageController,
);

module.exports = imageRouter;
