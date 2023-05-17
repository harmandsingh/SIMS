package routes

import (
	"go-api/controllers"

	"github.com/gofiber/fiber/v2"
)

func AddStudentGroup(app *fiber.App) {
	studentGroup := app.Group("api/v1/students")

	studentGroup.Get("/", controllers.GetStudents)
	studentGroup.Get("/:id", controllers.GetStudent)
	studentGroup.Post("/", controllers.CreateStudent)
	studentGroup.Put("/", controllers.UpdateStudent)
	studentGroup.Delete("/:id", controllers.DeleteStudent)
}
