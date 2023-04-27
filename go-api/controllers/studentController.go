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

var studentsCollection *mongo.Collection = configs.GetCollection(configs.DB, "students")
var validateStudent = validator.New()

func CreateStudent(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var student models.Student
	defer cancel()

	if err := c.BodyParser(&student); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.StudentResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if validationErr := validateStudent.Struct(&student); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.StudentResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	newStudent := models.Student{
		Id: primitive.NewObjectID(),
		Name: student.Name,
		FatherName: student.FatherName,
		MotherName: student.MotherName,
		DOB: student.DOB,
		PhoneNumber: student.PhoneNumber,
		StreetAddress: student.StreetAddress,
		City: student.City,
		State: student.State,
		Country: student.Country,
	}

	result, err := studentsCollection.InsertOne(ctx, newStudent)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.StudentResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusCreated).JSON(responses.StudentResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": result}})
}

func GetStudent(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	studentId := c.Params("studentId")
	var student models.Student
	defer cancel()

	objectId, _ := primitive.ObjectIDFromHex(studentId)

	err := studentsCollection.FindOne(ctx, bson.M{"id": objectId}).Decode(&student)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.StudentResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusOK).JSON(responses.StudentResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": student}})
}

func GetAllStudents(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var students[] models.Student
	defer cancel()

	results, err := studentsCollection.Find(ctx, bson.M{})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.StudentResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	defer results.Close(ctx)
	for results.Next(ctx){
		var student models.Student
		if err = results.Decode(&student); err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.StudentResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}

		students = append(students, student)
	}

	return c.Status(http.StatusOK).JSON(responses.StudentResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": students}})
}