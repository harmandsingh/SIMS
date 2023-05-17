package routes

import (
	"go-api/controllers"

	"github.com/gofiber/fiber/v2"
)

func AddStudentGroup(app *fiber.App){
	studentGroup := app.Group("api/v1/students")

	studentGroup.Get("/", AuthRequired, controllers.GetStudents)
	studentGroup.Get("/:id", AuthRequired, controllers.GetStudent)
	studentGroup.Post("/", AuthRequired, controllers.CreateStudent)
	studentGroup.Put("/", AuthRequired, controllers.UpdateStudent)
	studentGroup.Delete("/", AuthRequired, controllers.DeleteStudent)
}