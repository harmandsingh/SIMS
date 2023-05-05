package routes

import (
	"go-api/controllers"

	"github.com/gofiber/fiber/v2"
)

func AddAuthGroup(app *fiber.App){
	auth := app.Group("api/v1/auth")

	auth.Post("/login", controllers.Login)
}