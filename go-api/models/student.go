package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Student struct {
<<<<<<< HEAD
	ID            string `json:"id" bson:"_id"`
	Name          string `json:"name" bson:"name" validate:"required"`
	FatherName    string `json:"fatherName" bson:"fatherName" validate:"required"`
	MotherName    string `json:"motherName" bson:"motherName" validate:"required"`
	DOB           string `json:"dob" bson:"dob" validate:"required"`
	PhoneNumber   string `json:"phoneNumber" bson:"phoneNumber" validate:"required"`
	StreetAddress string `json:"streetAddress" bson:"streetAddress" validate:"required"`
	City          string `json:"city" bson:"city" validate:"required"`
	State         string `json:"state" bson:"state" validate:"required"`
	Country       string `json:"country" bson:"country" validate:"required"`
}
=======
	ID primitive.ObjectID `json:"id" bson:"_id"`
	Name string `json:"name" bson:"name" validate:"required"`
	FatherName string `json:"fatherName" bson:"fatherName" validate:"required"`
	MotherName string `json:"motherName" bson:"motherName" validate:"required"`
	DOB string `json:"dob" bson:"dob" validate:"required"`
	PhoneNumber string `json:"phoneNumber" bson:"phoneNumber" validate:"required"`
	StreetAddress string `json:"streetAddress" bson:"streetAddress" validate:"required"`
	City string `json:"city" bson:"city" validate:"required"`
	State string `json:"state" bson:"state" validate:"required"`
	Country string `json:"country" bson:"country" validate:"required"`
	EnrolledClass enrolledClass `json:"enrolledClass" bson:"enrolledClass"`
}

type enrolledClass struct {
	ID primitive.ObjectID `json:"id" bson:"_id" validate:"required"`
	ClassName string `json:"className" bson:"className" validate:"required"`
	ClassCourses []Course `json:"classCourses" bson:"classCourses" validate:"required"`
}
>>>>>>> be60425adde3bc2af7fe0cd5ed55cb984404af7a
