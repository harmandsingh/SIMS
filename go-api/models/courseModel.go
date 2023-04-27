package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Course struct {
	Id primitive.ObjectID `json:"_id,omitempty"`
	Name string `json:"name,omitempty" validate:"required"`
	Description string `json:"description,omitempty" validate:"required"`
}