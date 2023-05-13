package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Attendance struct{
	ID primitive.ObjectID `json:"id" bson:"_id"`
	Attendance bool `json:"attendance" bson:"attendance"`
	StudentID primitive.ObjectID `json:"studentId" bson:"studentId" validate:"required"`
	CourseID primitive.ObjectID `json:"courseId" bson:"courseId" validate:"required"`
	ClassID primitive.ObjectID `json:"classId" bson:"classId" validate:"required"`
	Date time.Time `json:"date" bson:"date"`
}