import express from "express";
import { adminLogin, adminRegister, studentLogin, teacherLogin } from "../controllers/auth.js";

const router = express.Router();


router.post("/adminRegister", adminRegister)

router.post("/adminLogin", adminLogin)

router.post("/studentLogin", studentLogin)

router.post("/teacherLogin", teacherLogin)

export default router