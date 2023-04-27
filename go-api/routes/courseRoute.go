package routes

import (
	"go-sims-api/controllers"

	"github.com/gofiber/fiber/v2"
)

func CourseRoute(app *fiber.App){
	app.Post("/course", controllers.CreateCourse)
	app.Get("/course/:courseId", controllers.GetCourse)
}