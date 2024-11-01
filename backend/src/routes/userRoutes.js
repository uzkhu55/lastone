// routes/userRoutes.js
import { Router } from "express";
import { addHeartSlot } from "../../controllers/addheartcontroller.js";
import { getHeartCount } from "../../controllers/getheartcontroller.js";
import { createUser, verifyOtp } from "../../controllers/UserController.js";
import { loginUser } from "../../controllers/logincontroller.js";
import { adminHeartSlot } from "../../controllers/adminheartcontroller.js";
import { qrcontroller } from "../../controllers/qrgetcontroller.js";
import {
  addReward,
  seedDefaultRewards,
} from "../../controllers/rewardcontroller.js"; // Import the new function
import { getSelectedRewards } from "../../controllers/savecontroller.js";

const router = Router();

router.post("/add-heart-slot", addHeartSlot);
router.post("/admin-heart-slot", adminHeartSlot);
router.get("/heart-count", getHeartCount);
router.get("/qr", qrcontroller);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/reward", addReward);

router.get("/save-reward", getSelectedRewards); // Add this route

router.post("/seed-rewards", seedDefaultRewards); // This will trigger the seeding of default rewards

router.post("/verify-otp", verifyOtp);

export default router;
