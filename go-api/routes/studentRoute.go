package routes

import (
	"go-sims-api/controllers"

	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v3"
)

func StudentRoute(app *fiber.App){
	app.Post("/student", controllers.CreateStudent)

	app.Get("/student/:studentId", controllers.GetStudent)

	app.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte("secret"),
	}))
	
	app.Get("/students", controllers.GetAllStudents)
}