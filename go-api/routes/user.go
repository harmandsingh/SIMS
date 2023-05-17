package routes

import (
	"go-api/auth"
	"go-api/controllers"
	"go-api/utils"
	"net/http"

	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v3"
)

func AuthRequired(c *fiber.Ctx) error {
	return jwtware.New(jwtware.Config{
		SigningKey: auth.JwtSecretKey,
		SigningMethod: auth.JwtSigningMethod,
		TokenLookup: "header:Authorization",
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			return c.Status(http.StatusUnauthorized).JSON(utils.NewJError(err))
		},
	})(c)
}

func AddUserGroup(app *fiber.App){
	auth := app.Group("api/v1/users")

	auth.Post("/register", controllers.Register)
	auth.Post("/login", controllers.Login)
	auth.Post("/logout", AuthRequired, controllers.Logout)
	auth.Get("/", AuthRequired, controllers.GetUsers)
	auth.Get("/:id", AuthRequired, controllers.GetUsers)
}