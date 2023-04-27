package controllers

import (
	"context"
	"go-sims-api/configs"
	"go-sims-api/models"
	"go-sims-api/responses"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var coursesCollection *mongo.Collection = configs.GetCollection(configs.DB, "courses")
var validateCourse = validator.New()

func CreateCourse(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var course models.Course
	defer cancel()

	if err := c.BodyParser(&course); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.CourseResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if validationErr := validateCourse.Struct(&course); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.CourseResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	newCourse := models.Course{
		Id: primitive.NewObjectID(),
		Name: course.Name,
		Description: course.Description,
	}

	result, err := coursesCollection.InsertOne(ctx, newCourse)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.CourseResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusCreated).JSON(responses.CourseResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": result}})
}

func GetCourse(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	courseId := c.Params("courseId")
	var course models.Course
	defer cancel()

	objectId, _ := primitive.ObjectIDFromHex(courseId)

	err := coursesCollection.FindOne(ctx, bson.M{"id": objectId}).Decode(&course)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.CourseResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusOK).JSON(responses.CourseResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": course}})
}