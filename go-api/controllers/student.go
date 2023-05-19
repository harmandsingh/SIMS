package controllers

import (
	"go-api/config"
	"go-api/models"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetStudents(c *fiber.Ctx) error {
	collection := config.GetDBCollection("students")

	// find all students
	students := make([]models.Student, 0)
	cursor, err := collection.Find(c.Context(), bson.M{})
	if err != nil{
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// iterate over the cursor
	for cursor.Next(c.Context()){
		student := models.Student{}
		err := cursor.Decode(&student)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
		students = append(students, student)
	}

	return c.Status(200).JSON(fiber.Map{"data": students})
}

func GetStudent(c * fiber.Ctx) error {
	collection := config.GetDBCollection("students")

	id := c.Params("id")
	if id == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "id is required",
		})
	}
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid id",
		})
	}

	student := models.Student{}

	err = collection.FindOne(c.Context(), bson.M{"_id": objectId}).Decode(&student)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{"data": student})
}

type createStudentDTO struct {
	Name string `json:"name" bson:"name"`
	FatherName string `json:"fatherName" bson:"fatherName"`
	MotherName string `json:"motherName" bson:"motherName"`
	DOB string `json:"dob" bson:"dob"`
	PhoneNumber string `json:"phoneNumber" bson:"phoneNumber"`
	StreetAddress string `json:"streetAddress" bson:"streetAddress"`
	City string `json:"city" bson:"city"`
	State string `json:"state" bson:"state"`
	Country string `json:"country" bson:"country"`
}

func CreateStudent(c *fiber.Ctx) error {
	// validate body
	s := new(createStudentDTO)
	if err := c.BodyParser(s); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "invalid body",
		})
	}

	// create the student
	collection := config.GetDBCollection("students")
	result, err := collection.InsertOne(c.Context(), s)
	if err != nil{
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to create book",
			"message": err.Error(),
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"result": result,
	})
}

type updateStudentDTO struct {
	Name string `json:"name,omitempty" bson:"name,omitempty"`
	FatherName string `json:"fatherName,omitempty" bson:"fatherName,omitempty"`
	MotherName string `json:"motherName,omitempty" bson:"motherName,omitempty"`
	DOB string `json:"dob,omitempty" bson:"dob,omitempty"`
	Gender string `json:"gender,omitempty" bson:"gender,omitempty"`
	PhoneNumber string `json:"phoneNumber,omitempty" bson:"phoneNumber,omitempty"`
	StreetAddress string `json:"streetAddress,omitempty" bson:"streetAddress,omitempty"`
	City string `json:"city,omitempty" bson:"city,omitempty"`
	State string `json:"state,omitempty" bson:"state,omitempty"`
	Country string `json:"country,omitempty" bson:"country,omitempty"`
}

func UpdateStudent(c *fiber.Ctx) error {
	// validate the body
	s := new(updateStudentDTO)
	if err := c.BodyParser(s); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "invalid body",
		})
	}

	// get the id
	id := c.Params("id")
	if id == "" {
		return c.Status(400).JSON(fiber.Map{
			"error": "invalid body",
		})
	}

	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "invalid id",
		})
	}

	// update the book
	collection := config.GetDBCollection("students")
	result, err := collection.UpdateOne(c.Context(), bson.M{"_id": objectId}, bson.M{"$set": s})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "failed to update student",
			"message": err.Error(),
		})
	}

	// return the student
	return c.Status(200).JSON(fiber.Map{
		"result": result,
	})
}

func DeleteStudent(c * fiber.Ctx) error {
	// get the student id
	id := c.Params("id")
	if id == "" {
		return c.Status(400).JSON(fiber.Map{
			"error": "id is required",
		})
	}
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "invalid id",
		})
	}

	// delete the student
	collection := config.GetDBCollection("students")
	result, err := collection.DeleteOne(c.Context(), bson.M{"_id": objectId})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "failed to delete book",
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{"result": result})
}