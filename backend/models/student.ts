import { InferSchemaType, Schema, model } from "mongoose";

/* Student Schema for Mongoose */
const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    fatherName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    motherName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    dob: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    address: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    city: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    state: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    country: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    phoneNumber: {
      type: String,
      min: 2,
      max: 100,
    },
  },
  { timestamps: true }
);

type Student = InferSchemaType<typeof studentSchema>;

export default model<Student>("Student", studentSchema);
