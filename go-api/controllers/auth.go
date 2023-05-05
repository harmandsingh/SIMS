package controllers

import (
	"errors"
	"fmt"
	"go-api/auth"
	"go-api/config"
	"go-api/models"
	"go-api/utils"
	"log"
	"net/http"
	"strings"

	"github.com/asaskevich/govalidator"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Register input struct
type registerDTO struct{
		Username string `json:"username" bson:"username" validate:"required"`
		Email string `json:"email" bson:"email" validate:"required"`
		Password string `json:"password" bson:"password" validate:"required"`
		ConfirmPassword string `json:"confirmPassword" bson:"confirmPassword" validate:"required"`
}

func Register(c *fiber.Ctx) error{
	newUser := new(registerDTO)

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
	var user models.User
	err := collection.FindOne(c.Context(), bson.M{"email": newUser.Email}).Decode(&user)
	if err == nil {
		c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "user with the given email already exists"})
	}

	// Check if the username is already taken
	newUser.Username = utils.NormalizeUsername(newUser.Username)
	err = collection.FindOne(c.Context(), bson.M{"username": newUser.Username}).Decode(&user)
	if err == nil {
		c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": "username already taken",
		})
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

	// Hash the password
	newUser.Password, err = utils.EncryptPassword(newUser.Password)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	result, err := collection.InsertOne(c.Context(), newUser)
	if err != nil {
		c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"error": "error creating user",
			"message": err.Error(),
		})
	}

	return c.Status(http.StatusCreated).JSON(fiber.Map{
		"result": result,
	})
}

type loginDTO struct {
	Email string `json:"email" bson:"email" validate:"required"`
	Password string `json:"password" bson:"password" validate:"required"`
}

func Login(c *fiber.Ctx) error{
	input := new(loginDTO)
	err := c.BodyParser(&input)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	
	user := models.User{}
	collection := config.GetDBCollection("users")
	input.Email = utils.NormalizeEmail(input.Email)
	err = collection.FindOne(c.Context(), bson.M{"email": input.Email}).Decode(&user)
	if err != nil {
		log.Printf("%s signin failed: %v\n", input.Email, err.Error())
		c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	err = utils.VerifyPassword(user.Password, input.Password)
	if err != nil {
		log.Printf("%s signin failed: %v\n", input.Email, err.Error())
		c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"error": "invalid signin credentials",
		})
	}

	token, err := auth.NewToken(user.ID.Hex())
	if err != nil {
		log.Printf("%s signin failed: %v\n", input.Email, err.Error())
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"user": user,
		"token": fmt.Sprintf("Bearer %s", token),
	})
}

func GetUser(c *fiber.Ctx) error {
	return nil
}

func AuthRequestWithId(c *fiber.Ctx) (*jwt.RegisteredClaims, error){
	id := c.Params("id")
	if !primitive.IsValidObjectID(id){
		return nil, errors.New("unauthorized")
	}
	token := c.Locals("user").(*jwt.Token)
	payload, err := auth.ParseToken(token.Raw)
	if err != nil {
		return nil, err
	}

	issuer, _ := payload.GetIssuer()

	if issuer != id {
		return nil, errors.New("unauthorized")
	}
	return payload, nil
}