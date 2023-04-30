package models

type Course struct {
	ID string `json:"id" bson:"_id"`
	Name string `json:"name" bson:"name" validate:"required"`
	Description string `json:"description" bson:"description" validate:"required"`
}