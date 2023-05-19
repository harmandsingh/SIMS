package routes

import (
	"go-api/controllers"

	"github.com/gofiber/fiber/v2"
)

func AddCourseGroup(app *fiber.App) {
	courseGroup := app.Group("api/v1/courses")

	courseGroup.Get("/", AuthRequired, controllers.GetCourses)
	courseGroup.Get("/:id", AuthRequired, controllers.GetCourse)
	courseGroup.Post("/", AuthRequired, controllers.CreateCourse)
	courseGroup.Put("/:id", AuthRequired, controllers.UpdateClass)
	courseGroup.Delete("/:id", AuthRequired, controllers.DeleteClass)
}
