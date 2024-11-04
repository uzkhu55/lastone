// routes/userRoutes.js
import { Router } from "express";
import { addHeartSlot } from "../../controllers/addheartcontroller.js";
import { getHeartCount } from "../../controllers/getheartcontroller.js";
import { createUser, verifyOtp } from "../../controllers/UserController.js";
import { loginUser } from "../../controllers/logincontroller.js";
import { adminHeartSlot } from "../../controllers/adminheartcontroller.js";
import { qrcontroller } from "../../controllers/qrgetcontroller.js";
import { addReward } from "../../controllers/rewardcontroller.js"; // Import the new function
import { getSelectedRewards } from "../../controllers/savecontroller.js";
import { getRewards } from "../../controllers/getrewardcontroller.js";
import { deleteReward } from "../../controllers/rewarddeletecontroller.js";
import { getUserByUsername } from "../../controllers/getusernamecontroller.js";
import { addPoints } from "../../controllers/addpointscontroler.js";
import { heartDecrController } from "../../controllers/hearDecrController.js";
import { getLeaderboard } from "../../controllers/getLeaderbaordcontroller.js";

const router = Router();

router.post("/add-heart-slot", addHeartSlot);
router.post("/admin-heart-slot", adminHeartSlot);
router.get("/heart-count", getHeartCount);
router.get("/qr", qrcontroller);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/reward", addReward);
router.get("/rewards", getRewards);
router.delete("/reward/:id", deleteReward); // Set up the route to delete a reward by ID
router.get("/user/:username", getUserByUsername); // Route to get user by username
router.post("/add-points", addPoints);
router.get("/save-reward", getSelectedRewards); // Add this route
router.post("/admin-heart-decr", heartDecrController); // Add this route
router.get("/leaderboard", getLeaderboard);

router.post("/verify-otp", verifyOtp);

export default router;
