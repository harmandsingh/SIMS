package main

import (
	"go-sims-api/routes"

	"github.com/gofiber/fiber/v2"
)

func main(){
	// Fiber App
	app := fiber.New()

	// Connecting to MongoDB
	//configs.ConnectDB()

	// Student Routes
	routes.StudentRoute(app)

	//Course Routes
	routes.CourseRoute(app)

	app.Listen(":6000")
}