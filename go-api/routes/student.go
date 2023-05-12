package routes

import (
	"go-api/controllers"

	"github.com/gofiber/fiber/v2"
)

<<<<<<< HEAD
func AddStudentGroup(app *fiber.App) {
	studentGroup := app.Group("api/v1/student")
=======
func AddStudentGroup(app *fiber.App){
	studentGroup := app.Group("api/v1/students")
>>>>>>> f1f4b4563c6ae85ca1b20c2e1bb03b0807f558ad

	studentGroup.Get("/", controllers.GetStudents)
	studentGroup.Get("/:id", controllers.GetStudent)
	studentGroup.Post("/", controllers.CreateStudent)
	studentGroup.Put("/", controllers.UpdateStudent)
	studentGroup.Delete("/:id", controllers.DeleteStudent)
}
