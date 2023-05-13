package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Grade struct{
	ID primitive.ObjectID `json:"id" bson:"_id"`
	GradeLetter string `json:"gradeLetter" bson:"gradeLetter" validate:"required"`
	Remark string `json:"remark" bson:"remark"`
	StudentID primitive.ObjectID `json:"studentId" bson:"studentId" validate:"required"`
	CourseID primitive.ObjectID `json:"courseId" bson:"courseId" validate:"required"`
	ClassID primitive.ObjectID `json:"classId" bson:"classId" validate:"required"`
}