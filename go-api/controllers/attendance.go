package controllers

// import (
// 	"go-api/config"
// 	"go-api/models"
// 	"go-api/utils"
// 	"net/http"

// 	"github.com/gofiber/fiber/v2"
// 	"go.mongodb.org/mongo-driver/bson"
// 	"go.mongodb.org/mongo-driver/bson/primitive"
// )

// func GetAttendance(c *fiber.Ctx) error {
// 	collection := config.GetDBCollection("classes")

// 	// Find all classes
// 	classes := make([]models.monthlyAttendance, 0)
// 	cursor, err := collection.Find(c.Context(), bson.M{})
// 	if err != nil {
// 		return c.Status(http.StatusInternalServerError).JSON(utils.NewJError(err))
// 	}

// 	// Iterate over the cursor
// 	for cursor.Next(c.Context()) {
// 		class := models.Class{}
// 		err := cursor.Decode(&class)
// 		if err != nil {
// 			return c.Status(http.StatusInternalServerError).JSON(utils.NewJError(err))
// 		}
// 		classes = append(classes, class)
// 	}

// 	// Return the result
// 	return c.Status(http.StatusOK).JSON(fiber.Map{
// 		"data": classes,
// 	})
// }

// func GetAttendanceByMonth(c *fiber.Ctx) error {
// 	// Check for class id in params
// 	monthlyAttendanceId := c.Params("id")
// 	if monthlyAttendanceId == "" {
// 		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
// 			"error": "Month doesn't exist",
// 		})
// 	}

// 	// Check if the id is valid object id
// 	objectId, err := primitive.ObjectIDFromHex(monthlyAttendanceId)
// 	if err != nil {
// 		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
// 			"error": "Invalid month id",
// 		})
// 	}
// }
