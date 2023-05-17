package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Attendance struct{
	ID primitive.ObjectID `json:"id" bson:"_id"`
	Attendance bool `json:"attendance" bson:"attendance"`
	Student AttendanceStudent `json:"student" bson:"student" validate:"required"`
	Course AttendanceCourse `json:"course" bson:"course" validate:"required"`
	Class AttendanceClass `json:"class" bson:"class" validate:"required"`
	Date string `json:"date" bson:"date"`
}

type AttendanceStudent struct{
	ID primitive.ObjectID `json:"id" bson:"_id"`
	Name string `json:"name" bson:"name" validate:"required"`
}

type AttendanceCourse struct{
	ID primitive.ObjectID `json:"id" bson:"_id"`
	Name string `json:"name" bson:"name" validate:"required"`
}

type AttendanceClass struct{
	ID primitive.ObjectID `json:"id" bson:"_id"`
	Name string `json:"name" bson:"name" validate:"required"`
}