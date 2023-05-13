package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Class struct {
	ID primitive.ObjectID `json:"id" bson:"_id"`
	Name string `json:"name" bson:"name" validate:"required"`
	Courses []Course `json:"courses" bson:"courses"`
	Students []ClassStudent `json:"students" bson:"students"`
}

type ClassStudent struct {
	ID primitive.ObjectID `json:"id" bson:"_id" validate:"required"`
	Name string `json:"name" bson:"name" validate:"required"`	
}