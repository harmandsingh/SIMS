package models

type Class struct {
	ID string `json:"id" bson:"_id"`
	Name string `json:"name" bson:"name" validate:"required"`
}

type ClassEnrollment struct {
	Class Class `json:"class" bson:"class"`
	EnrolledStudents []Student `json:"enrolledStudents" bson:"enrolledStudents"`
}