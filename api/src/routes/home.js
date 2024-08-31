import express from "express";
import { contentForm } from "../controllers/home.js";


const router = express.Router();

router.post('/contect', contentForm)



export default router