package routes

import (
	"go-api/controllers"

	"github.com/gofiber/fiber/v2"
)

func AddClassGroup(app *fiber.App){
	classGroup := app.Group("api/v1/classes")

	classGroup.Get("/", AuthRequired, controllers.GetClasses)
	classGroup.Get("/:id", AuthRequired, controllers.GetClass)
	classGroup.Post("/", AuthRequired, controllers.CreateClass)
	classGroup.Put("/:id", AuthRequired, controllers.UpdateClass)
	classGroup.Delete("/:id", AuthRequired, controllers.DeleteClass)
}