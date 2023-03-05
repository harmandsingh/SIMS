import { RequestHandler } from "express";
import StudentModel from "../models/student";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const getStudents: RequestHandler = async (req, res, next) => {
  try {
    const students = await StudentModel.find().exec();
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

export const getStudent: RequestHandler = async (req, res, next) => {
  const studentId = req.params.studentId;
  try {
    /* Check if the studentId is valid */
    if (!isValidObjectId(studentId)) {
      throw createHttpError(400, "Invalid Student ID");
    }
    /* Find the student document by ID */
    const student = await StudentModel.findById(studentId).exec();

    if (!student) {
      throw createHttpError(404, "Student Not Found");
    }
    /* Send the response */
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

interface CreateStudentBody {
  name?: string;
  fatherName?: string;
  motherName?: string;
  dob?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phoneNumber?: string;
}

export const createStudent: RequestHandler<
  unknown,
  unknown,
  CreateStudentBody,
  unknown
> = async (req, res, next) => {
  const name = req.body.name;
  const fatherName = req.body.fatherName;
  const motherName = req.body.motherName;
  const dob = req.body.dob;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const country = req.body.country;
  const phoneNumber = req.body.phoneNumber;

  try {
    if (
      !name ||
      !fatherName ||
      !motherName ||
      !dob ||
      !address ||
      !city ||
      !state ||
      !country
    ) {
      throw createHttpError(
        400,
        "Student is missing one of the required fields"
      );
    }
    const newStudent = await StudentModel.create({
      name: name,
      fatherName: fatherName,
      motherName: motherName,
      dob: dob,
      address: address,
      city: city,
      state: state,
      country: country,
      phoneNumber: phoneNumber,
    });

    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};

interface UpdateStudentParams {
  studentId: string;
}

interface UpdateStudentBody {
  name?: string;
  fatherName?: string;
  motherName?: string;
  dob?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phoneNumber?: string;
}

export const updateStudent: RequestHandler<
  UpdateStudentParams,
  unknown,
  UpdateStudentBody,
  unknown
> = async (req, res, next) => {
  const studentId = req.params.studentId;
  const newName = req.body.name;
  const newFatherName = req.body.fatherName;
  const newMotherName = req.body.motherName;
  const newDob = req.body.dob;
  const newAddress = req.body.address;
  const newCity = req.body.city;
  const newState = req.body.state;
  const newCountry = req.body.country;
  const newPhoneNumber = req.body.phoneNumber;

  try {
    /* Check if the studentId is valid */
    if (!isValidObjectId(studentId)) {
      throw createHttpError(400, "Invalid Student ID");
    }

    if (
      !newName ||
      !newFatherName ||
      !newMotherName ||
      !newDob ||
      !newAddress ||
      !newCity ||
      !newState ||
      !newCountry
    ) {
      throw createHttpError(
        400,
        "Student is missing one of the required fields"
      );
    }
    /* Find the student document by ID */
    const student = await StudentModel.findById(studentId).exec();

    if (!student) {
      throw createHttpError(404, "Student Not Found");
    }

    student.name = newName;
    student.fatherName = newFatherName;
    student.motherName = newMotherName;
    student.dob = newDob;
    student.address = newAddress;
    student.city = newCity;
    student.state = newState;
    student.country = newCountry;
    newPhoneNumber && (student.phoneNumber = newPhoneNumber);

    const updatedStudent = await student.save();

    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

export const deleteStudent: RequestHandler = async (req, res, next) => {
  const studentId = req.params.studentId;

  try {
    if (!isValidObjectId(studentId)) {
      throw createHttpError(400, "Invalid Student ID");
    }

    const student = await StudentModel.findById(studentId).exec();

    if (!student) {
      throw createHttpError(404, "Student Not Found");
    }

    await student.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
