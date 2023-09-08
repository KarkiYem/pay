import express from "express";
import { createSession, updateSession } from "../controllers/controller.js";

const router = express.Router();
router.post("/createSession", createSession);

router.post("/getSession", updateSession);

export default router;
