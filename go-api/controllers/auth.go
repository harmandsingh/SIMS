package controllers

import (
	"go-mongo-api/config"
	"go-mongo-api/models"
	"go-mongo-api/utils"
	"net/http"
	"strings"

	"github.com/asaskevich/govalidator"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

// Register input struct
type registerInput struct{
		Username string `json:"username" bson:"username" validate:"required"`
		Email string `json:"email" bson:"email" validate:"required"`
		Password string `json:"password" bson:"password" validate:"required"`
		ConfirmPassword string `json:"confirmPassword" bson:"confirmPassword" validate:"required"`
}

func Register(c *fiber.Ctx) error{
	var newUser registerInput

	// Validate the request body
	if err := c.BodyParser(&newUser); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// Check for valid email
	newUser.Email = utils.NormalizeEmail(newUser.Email)
	if !govalidator.IsEmail(newUser.Email){
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid email",
		})
	}

	collection := config.GetDBCollection("users")

	// Check if the user with the given email already exists
	err := collection.FindOne(c.Context(), bson.M{"email": newUser.Email})
	if err != nil {
		c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "user with the given email already exists"})
	}

	// Check for empty password
	if strings.TrimSpace(newUser.Password) == ""{
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "empty password"})
	}

	// Check if password and confirm password are equal
	if newUser.Password != newUser.ConfirmPassword{
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "passwords do not match",
		})
	}

	return nil
}

func Login(c *fiber.Ctx) error{
	var user models.User
	err := c.BodyParser(&user)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return nil
}