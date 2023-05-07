package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Grade struct {
	ID primitive.ObjectID `json:"id" bson:"_id"`
	LetterGrade string `json:"letterGrade" bson:"letterGrade"`
	Remark string `json:"remark" bson:"remark"`
}