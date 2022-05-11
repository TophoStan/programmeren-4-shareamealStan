const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/", userController.validateUser, userController.addUser);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.validateId, userController.getUserById);

router.get("/profile", userController.getUserProfile);

router.put(
  "/:id",
  userController.validateId,
  userController.validateUser,
  userController.updateUser
);

router.delete("/:id", userController.validateId, userController.deleteUser);

module.exports = router;
