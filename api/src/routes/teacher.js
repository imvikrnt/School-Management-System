import express from "express";
import { dashInfo } from "../controllers/teacher.js"; // Ensure this path is correct and ends with .js if using ES Modules

const router = express.Router();

router.get("/dashinfo", dashInfo);

export default router;
