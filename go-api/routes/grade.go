package routes

import (
	"go-api/controllers"

	"github.com/gofiber/fiber/v2"
)

func AddGradeGroup(app *fiber.App){
	gradeGroup := app.Group("api/v1/grades")

	gradeGroup.Get("/", controllers.GetGrades)
	gradeGroup.Get("/:id", controllers.GetGrade)
}