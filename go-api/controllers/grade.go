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

func GetGrades(c *fiber.Ctx) error {
	collection := config.GetDBCollection("grades")

	// Find all grades
	grades := make([]models.Grade, 0)
	cursor, err := collection.Find(c.Context(), bson.M{})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewJError(err))
	}

	// Iterate over the cursor
	for cursor.Next(c.Context()){
		grade := models.Grade{}
		err := cursor.Decode(&grade)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(utils.NewJError(err))
		}
		grades = append(grades, grade)
	}

	// Return the list of grades
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"data": grades,
	})
}

func GetGrade(c *fiber.Ctx) error {
	// Get the grade id from params
	gradeId := c.Params("id")
	if gradeId == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error":"Grade id is required",
		})
	}

	// Validate the grade id
	objectId, err := primitive.ObjectIDFromHex(gradeId)
	if err != nil{
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid grade id",
		})
	}

	// Get the grade by id
	collection := config.GetDBCollection("grades")
	grade := models.Grade{}

	err = collection.FindOne(c.Context(), bson.M{"_id": objectId}).Decode(&grade)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewJError(err))
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"data": grade,
	})
}