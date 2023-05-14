package routes

import (
	"go-api/controllers"

	"github.com/gofiber/fiber/v2"
)

func AddClassGroup(app *fiber.App){
	classGroup := app.Group("api/v1/classes")

	classGroup.Get("/", controllers.GetClasses)
	classGroup.Get("/:id", controllers.GetClass)
	classGroup.Post("/", controllers.CreateClass)
	classGroup.Put("/:id", controllers.UpdateClass)
	classGroup.Delete("/:id", controllers.DeleteClass)
}