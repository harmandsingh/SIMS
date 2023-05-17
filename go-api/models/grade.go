package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Grade struct{
	ID primitive.ObjectID `json:"id" bson:"_id"`
	GradeLetter string `json:"gradeLetter" bson:"gradeLetter" validate:"required"`
	Remark string `json:"remark" bson:"remark"`
	Student GradeStudent `json:"student" bson:"student" validate:"required"`
	Class GradeClass `json:"class" bson:"class" validate:"required"`
	Course Course `json:"course" bson:"course" validate:"required"`
}

type GradeStudent struct{
	ID primitive.ObjectID `json:"id" bson:"_id" validate:"required"`
	Name string `json:"name" bson:"name" validate:"required"`
}

type GradeClass struct{
	ID primitive.ObjectID `json:"id" bson:"_id" validate:"required"`
	Name string `json:"name" bson:"name" validate:"required"`
}