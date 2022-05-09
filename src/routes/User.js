const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/", userController.validateUser, userController.addUser);

router.get("/", userController.getAllUsers);

router.get("/:userId", userController.getUserById);

router.get("/profile", userController.getUserProfile);

router.put("/:userId", userController.validateUser, userController.updateUser);

router.delete("/:userId", userController.deleteUser);

module.exports = router;
