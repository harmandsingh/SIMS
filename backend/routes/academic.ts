import express from "express";
import * as AcademicController from "../controllers/academic";

const router = express.Router();

router.get("/", AcademicController.getStudents);

router.get("/:studentId", AcademicController.getStudent);

router.post("/", AcademicController.createStudent);

router.patch("/:studentId", AcademicController.updateStudent);

router.delete("/:studentId", AcademicController.deleteStudent);

export default router;
