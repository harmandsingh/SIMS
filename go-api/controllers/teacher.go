package controllers

import (
	"go-api/config"
	"go-api/models"
	"go-api/utils"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetTeachers(c *fiber.Ctx) error {
	collection := config.GetDBCollection("teachers")

	// Find all teachers
	teachers := make([]models.Teacher, 0)
	cursor, err := collection.Find(c.Context(), bson.M{})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewJError(err))
	}

	// Iterate over the cursor
	for cursor.Next(c.Context()){
		teacher := models.Teacher{}
		err := cursor.Decode(&teacher)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(utils.NewJError(err))
		}
		teachers = append(teachers, teacher)
	}

	// Return the data
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"data": teachers,
	})
}

func GetTeacher(c *fiber.Ctx) error {
	// Get the teacher id from params
	teacherId := c.Params("id")
	if teacherId == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Teacher id is required",
		})
	}

	// Validate the teacher id
	objectId, err := primitive.ObjectIDFromHex(teacherId)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid teacher id",
		})
	}

	// Get the teacher object by id
	collection := config.GetDBCollection("teachers")
	teacher := models.Teacher{}
	err = collection.FindOne(c.Context(), bson.M{"_id": objectId}).Decode(&teacher)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewJError(err))
	}

	// Return the teacher object
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"data": teacher,
	})
}

type createTeacherDTO struct{
	Name string `json:"name" bson:"name" validate:"required"`
	Email string `json:"email" bson:"email" validate:"required"`
	DOB string `json:"dob" bson:"dob" validate:"required"`
	TeachingCourses []models.Course `json:"teachingCourses" bson:"teachingCourses"`
	TeachingClasses []models.TeachingClasses `json:"teachingClasses" bson:"teachingClasses"`
}

func CreateTeacher(c *fiber.Ctx) error {
	// Validate the teacher body
	teacher := new(createTeacherDTO)
	if err := c.BodyParser(teacher); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid body",
		})
	}

	// Add teacher object to db
	collection := config.GetDBCollection("teachers")
	result, err := collection.InsertOne(c.Context(), teacher)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Failed to create teacher",
			"message": err.Error(),
		})
	}

	// Return the result
	return c.Status(http.StatusCreated).JSON(fiber.Map{
		"result": result,
	})
}

type updateTeacherDTO struct{
	Name string `json:"name,omitempty" bson:"name,omitempty"`
	Email string `json:"email,omitempty" bson:"email,omitempty"`
	DOB string `json:"dob,omitempty" bson:"dob,omitempty"`
	TeachingCourses []models.Course `json:"teachingCourses,omitempty" bson:"teachingCourses,omitempty"`
	TeachingClasses []models.TeachingClasses `json:"teachingClasses,omitempty" bson:"teachingClasses,omitempty"`
}

func UpdateTeacher(c *fiber.Ctx) error {
	// Validate the body
	teacher := new(updateTeacherDTO)
	if err := c.BodyParser(teacher); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	// Get teacher id from params
	teacherId := c.Params("id")
	if teacherId == "" {
		return c.Status(http.StatusBadGateway).JSON(fiber.Map{
			"error": "Teacher id is required",
		})
	}

	// Validate the teacher id
	objectId, err := primitive.ObjectIDFromHex(teacherId)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid teacher id",
		})
	}

	// Update the teacher object in db
	collection := config.GetDBCollection("teachers")
	result, err := collection.UpdateOne(c.Context(), bson.M{"_id": objectId}, bson.M{"$set": teacher})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update teacher",
			"message": err.Error(),
		})
	}

	// Return the result
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"result": result,
	})
}

func DeleteTeacher(c *fiber.Ctx) error {
	// Get the teacher id from params
	teacherId := c.Params("id")
	if teacherId == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Teacher id is required",
		})
	}

	// Validate the teacher id
	objectId, err := primitive.ObjectIDFromHex(teacherId)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid teacher id",
		})
	}

	// Delete the teacher object from db
	collection := config.GetDBCollection("teachers")
	result, err := collection.DeleteOne(c.Context(), bson.M{"_id": objectId})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Faied to delete teacher",
			"message": err.Error(),
		})
	}

	// Return the result
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"result": result,
	})
}