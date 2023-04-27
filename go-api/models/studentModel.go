package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Student struct{
	Id primitive.ObjectID `json:"id,omitempty"`
	Name string `json:"name,omitempty" validate:"required"`
	FatherName string `json:"fatherName,omitempty" validate:"required"`
	MotherName string `json:"motherName,omitempty" validate:"required"`
	DOB string `json:"dob,omitempty" validate:"required"`
	PhoneNumber string `json:"phoneNumber,omitempty" validate:"required"`
	StreetAddress string `json:"streetAddress,omitempty" validate:"required"`
	City string `json:"city,omitempty" validate:"required"`
	State string `json:"state,omitempty" validate:"required"`
	Country string `json:"country,omitempty" validate:"required"`
	EnrolledCourses []Course `json:"enrolledCourses,omitempty"`
	Class *Class `json:"class,omitempty"`
}