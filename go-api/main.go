package main

import (
	"go-api/config"
	"go-api/routes"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	err := run()

	if err != nil {
		panic(err)
	}
}

func run() error {
	// init env
	err := config.LoadEnv()
	if err != nil {
		return err
	}

	// init db
	err = config.InitDB()
	if err != nil {
		return err
	}

	// defer closing the db connection
	defer config.CloseDB()

	// create the fiber app
	app := fiber.New()

	// add middleware
	app.Use(logger.New())
	app.Use(recover.New())
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	// add routes
	routes.AddUserGroup(app)
<<<<<<< HEAD
=======
	routes.AddStudentGroup(app)
	routes.AddClassGroup(app)
	routes.AddTeacherGroup(app)
>>>>>>> be60425adde3bc2af7fe0cd5ed55cb984404af7a

	// start server
	var port string
	if port = os.Getenv("PORT"); port == "" {
		port = "8080"
	}
	app.Listen(":" + port)

	return nil
}
