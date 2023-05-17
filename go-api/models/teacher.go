package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Teacher struct{
	ID primitive.ObjectID `json:"id" bson:"_id"`
	Name string `json:"name" bson:"name" validate:"required"`
	Email string `json:"email" bson:"email" validate:"required"`
	DOB string `json:"dob" bson:"dob" validate:"required"`
	TeachingCourses []Course `json:"teachingCourses" bson:"teachingCourses"`
	TeachingClasses []TeachingClasses `json:"teachingClasses" bson:"teachingClasses"`
}

type TeachingClasses struct{
	ID primitive.ObjectID `json:"id" bson:"_id" validate:"required"`
	Name string `json:"name" bson:"name" validate:"required"`
}