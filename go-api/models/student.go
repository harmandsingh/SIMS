package models

type Student struct {
	ID            string `json:"id" bson:"_id"`
	Name          string `json:"name" bson:"name" validate:"required"`
	FatherName    string `json:"fatherName" bson:"fatherName" validate:"required"`
	MotherName    string `json:"motherName" bson:"motherName" validate:"required"`
	DOB           string `json:"dob" bson:"dob" validate:"required"`
	PhoneNumber   string `json:"phoneNumber" bson:"phoneNumber" validate:"required"`
	StreetAddress string `json:"streetAddress" bson:"streetAddress" validate:"required"`
	City          string `json:"city" bson:"city" validate:"required"`
	State         string `json:"state" bson:"state" validate:"required"`
	Country       string `json:"country" bson:"country" validate:"required"`
}
