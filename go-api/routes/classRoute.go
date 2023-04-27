package routes

import (
	"go-sims-api/controllers"

	"github.com/gofiber/fiber/v2"
)

func ClassRoute(app *fiber.App){
	app.Post("/class", controllers.CreateCourse)
	app.Get("/class/:classId", controllers.GetCourse)
}