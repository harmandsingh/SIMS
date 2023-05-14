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

func GetClasses(c *fiber.Ctx) error {
	collection := config.GetDBCollection("classes")

	// Find all classes
	classes := make([]models.Class, 0)
	cursor, err := collection.Find(c.Context(), bson.M{})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewJError(err))
	}

	// Iterate over the cursor
	for cursor.Next(c.Context()) {
		class := models.Class{}
		err := cursor.Decode(&class)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(utils.NewJError(err))
		}
		classes = append(classes, class)
	}

	// Return the result
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"data": classes,
	})
}

func GetClass(c *fiber.Ctx) error {
	// Check for class id in params
	classId := c.Params("id")
	if classId == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Class id is required",
		})
	}

	// Check if the id is valid object id
	objectId, err := primitive.ObjectIDFromHex(classId)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid class id",
		})
	}

	// Find the class by id
	collection := config.GetDBCollection("classes")
	class := models.Class{}

	err = collection.FindOne(c.Context(), bson.M{"_id": objectId}).Decode(&class)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewJError(err))
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"data": class,
	})
}

type createClassDTO struct {
	Name string `json:"name" bson:"name" validate:"required"`
	Courses []models.Course `json:"courses" bson:"courses"`
	Students []models.EnrolledStudent `json:"students" bson:"students"`
}

func CreateClass(c *fiber.Ctx) error {
	// Validate the class body
	class := new(createClassDTO)
	if err := c.BodyParser(class); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid body",
			"message": err.Error()})
		}

	// Create class
	collection := config.GetDBCollection("classes")
	result, err := collection.InsertOne(c.Context(), class)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewJError(err))
	}

	// Return the created class
	return c.Status(http.StatusCreated).JSON(fiber.Map{
		"result": result,
	})
}

type updateClassDTO struct {
	Name string `json:"name,omitempty" bson:"name,omitempty"`
	Courses []models.Course `json:"courses,omitempty" bson:"courses,omitempty"`
	Students []models.EnrolledStudent `json:"students,omitempty" bson:"students,omitempty"`
}

func UpdateClass(c *fiber.Ctx) error {
	// Validate the body
	class := new(updateClassDTO)
	if err := c.BodyParser(class); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	// Get class id
	classId := c.Params("id")
	if classId == "" {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Class id is required",
		})
	}

	// Check for valid object id
	objectId, err := primitive.ObjectIDFromHex(classId)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid class id",
		})
	}

	// If id is valid update the class object
	collection := config.GetDBCollection("classes")
	result, err := collection.UpdateOne(c.Context(), bson.M{"_id": objectId}, bson.M{"$set": class})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(utils.NewJError(err))
	}

	// Return the class
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"result": result,
	})
}

func DeleteClass(c *fiber.Ctx) error {
	// Check for class id in params
	classId := c.Params("id")
	if classId == ""{
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Class id is required",
		})
	}

	// Validate the class id
	objectId, err := primitive.ObjectIDFromHex(classId)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid class id",
		})
	}

	// Delete the class
	collection := config.GetDBCollection("classes")
	result, err := collection.DeleteOne(c.Context(), bson.M{"_id": objectId})
	if err != nil{
		return c.Status(http.StatusInternalServerError).JSON(utils.NewJError(err))
	}

	// Return the result
	return c.Status(http.StatusOK).JSON(fiber.Map{
		"result": result,
	})
}