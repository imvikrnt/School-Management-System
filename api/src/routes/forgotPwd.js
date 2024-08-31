import express from 'express';
import { adminNewPwd, adminPwd, adminVerifyOtp, studentNewPwd, studentPwd, studentVerifyOtp, teacherNewPwd, teacherPwd, teacherVerifyOtp } from '../controllers/forgotPwd.js'

const router = express.Router();



router.post("/adminPwd", adminPwd)

router.post("/admin/verifyOtp", adminVerifyOtp)

router.post("/admin/newPwd", adminNewPwd)

router.post("/teacherPwd", teacherPwd)

router.post("/teacher/verifyOtp", teacherVerifyOtp)

router.post("/teacher/newPwd", teacherNewPwd)

router.post("/studentPwd", studentPwd)

router.post("/student/verifyOtp", studentVerifyOtp)

router.post("/student/newPwd", studentNewPwd)



export default router