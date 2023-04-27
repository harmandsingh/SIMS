package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Class struct{
	Id primitive.ObjectID `json:"_id,omitempty"`
	Name string `json:"name,omitempty" validate:"required"`
	Courses []Course `json:"courses,omitempty"`
	Students []Student `json:"students,omitempty"`
}