package routes

import (
	"go-api/controllers"

	"github.com/gofiber/fiber/v2"
)

func AddTeacherGroup(app *fiber.App){
	teacherGroup := app.Group("api/v1/teachers")

	teacherGroup.Get("/", controllers.GetTeachers)
	teacherGroup.Get("/:id", controllers.GetTeacher)
	teacherGroup.Post("/", controllers.CreateTeacher)
	teacherGroup.Put("/:id", controllers.UpdateTeacher)
	teacherGroup.Delete("/:id", controllers.DeleteTeacher)
}