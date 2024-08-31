import express from "express";
import multer from 'multer';
import path from 'path';
import { getPersonalData, getSum , addStudent, studentData, deleteStudent, currentStudentData, updateStudent, teacherData, addTeacher, deleteTeacher, currentTeacherData, updateTeacher,  addAnnouncement, announcementData, deleteAnnouncement, currentAnnData, updateAnn, addClass, addSubject, getClassData, getSubjectData, asignClassSubject, deleteClass, deleteSubject, currentClassData, currentSubjectData, updateClass, updateSubject,uploadProfile, resetPassword} from "../controllers/admins.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req, file,cb)=>{
        cb(null,file.fieldname + "_"+ Date.now()+ path.extname(file.originalname));
    }
})

const upload =multer({
    storage: storage
})
router.post("/upload",upload.single('image'), uploadProfile)


router.get("/getsum", getSum)
router.get("/getpersonaldata", getPersonalData)
router.post("/addstudent", addStudent)
router.get("/studentdata", studentData)
router.delete("/deletestudent", deleteStudent)
router.get("/currentstudent", currentStudentData)
router.put("/updatestudent", updateStudent)
router.get("/teacherdata", teacherData)
router.post("/addteacher", addTeacher)
router.delete("/deleteteacher", deleteTeacher)
router.get("/currentteacher", currentTeacherData)
router.put("/updateteacher", updateTeacher)
router.get("/announcementdata", announcementData)
router.post("/addannouncement", addAnnouncement)
router.delete("/deleteannouncement", deleteAnnouncement)
router.get("/currentannouncement", currentAnnData)
router.put("/updateannouncement", updateAnn)
router.post("/addclass",addClass)
router.post("/addsubject",addSubject)
router.get("/getclassdata",getClassData)
router.get("/getsubjectdata",getSubjectData)
router.post("/asignclasssubject",asignClassSubject)
router.delete("/deleteclass", deleteClass)
router.delete("/deletesubject", deleteSubject)
router.get("/currentclass", currentClassData)
router.get("/currentsubject", currentSubjectData)
router.put("/updateclass", updateClass)
router.put("/updatesubject", updateSubject)

router.post("/resetpassword", resetPassword)
export default router