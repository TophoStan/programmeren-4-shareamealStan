const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/", userController.validateUser, userController.addUser);

router.get("/", userController.getAllUsers);

router.get(
  "/:userId",
  userController.validateNumber,
  userController.getUserById
);

router.get("/profile", userController.getUserProfile);

router.put(
  "/:userId",
  userController.validateNumber,
  userController.validateUser,
  userController.updateUser
);

router.delete(
  "/:userId",
  userController.validateNumber,
  userController.deleteUser
);

module.exports = router;
