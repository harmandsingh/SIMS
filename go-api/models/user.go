package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID primitive.ObjectID `json:"id" bson:"_id"`
	Username string `json:"username" bson:"username" validate:"required"`
	Email string `json:"email" bson:"email" validate:"required"`
	Password string `json:"password" bson:"password" validate:"required"`
}