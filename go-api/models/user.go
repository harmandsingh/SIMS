package models

type User struct {
	ID string `json:"id" bson:"_id"`
	Username string `json:"username" bson:"username" validate:"required"`
	Email string `json:"email" bson:"email" validate:"required"`
	Password string `json:"password" bson:"password" validate:"required"`
}