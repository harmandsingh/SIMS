package routes

import (
	"go-api/controllers"

	"github.com/gofiber/fiber/v2"
)

func AddCourseGroup(app *fiber.App){
	courseGroup := app.Group("api/v1/courses")

	courseGroup.Get("/", controllers.GetCourses)
	courseGroup.Get("/:id", controllers.GetCourse)
	courseGroup.Post("/", controllers.CreateCourse)
	courseGroup.Put("/:id", controllers.UpdateClass)
	courseGroup.Delete("/:id", controllers.DeleteClass)
}