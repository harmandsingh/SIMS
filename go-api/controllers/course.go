package controllers

import (
	"go-api/config"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type createCourseDTO struct{
	Name string `json:"name" bson:"name" validate:"required"`
	Description string `json:"description" bson:"description" validate:"required"`
}

func CreateCourse(c *fiber.Ctx) error {
	// Validate the course body
	course := new(createCourseDTO)
	if err := c.BodyParser(course); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid body",})
	}

	// Create course
	collection := config.GetDBCollection("courses")
	result, err := collection.InsertOne(c.Context(), course)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create book",
			"message": err.Error(),
		})
	}
	
	// Return the created course
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"result": result,
	})
}

type updateCourseDTO struct{
	Name string `json:"name,omitempty" bson:"name,omitempty"`
	Description string `json:"description,omitempty" bson:"description,omitempty"`
}

func UpdateCourse(c *fiber.Ctx) error {
	// Validate the body
	course := new(updateCourseDTO)
	if err := c.BodyParser(course); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid body",
		})
	}

	// Get the course id
	courseId := c.Params("id")
	if courseId == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Course id is required",
		})
	}

	objectId, err := primitive.ObjectIDFromHex(courseId)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid id",
		})
	}

	// If id is valid update the course
	collection := config.GetDBCollection("courses")
	result, err := collection.UpdateOne(c.Context(), bson.M{"_id": objectId}, bson.M{"$set": course})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update course",
			"message": err.Error(),
		})
	}

	// Return the course
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"result": result,
	})
}