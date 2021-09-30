import express from "express";
import { getMood } from "../controllers/moodController.js";

const router = express.Router();


router.route('/checkMyMood').post(getMood);

export default router;
