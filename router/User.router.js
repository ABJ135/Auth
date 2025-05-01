const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const auth = require("../auth/jetAuth");

router.post("/createUser", userController.createUser);
router.post("/verifyOTP", userController.verifyOTP);
router.post("/login", userController.login);

router.get("/getUsers", auth, userController.getUsers);
router.put("/updateUser/:id", auth, userController.updateUser);
router.delete("/deleteUser/:id", auth, userController.deleteUser);

module.exports = router;
