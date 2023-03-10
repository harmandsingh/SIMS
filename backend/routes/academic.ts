import express from "express";
import * as AcademicController from "../controllers/academic";

const router = express.Router();

router.get("/student", AcademicController.getStudents);

router.get("/student/:studentId", AcademicController.getStudent);

router.post("/student", AcademicController.createStudent);

router.patch("/student/:studentId", AcademicController.updateStudent);

router.delete("/student/:studentId", AcademicController.deleteStudent);

export default router;
