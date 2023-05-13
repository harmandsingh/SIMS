package repository

import (
	"go-api/models"
)

const CoursesCollection = "courses"

type CoursesRepository interface {
	CreateCourse(course *models.Course) error
	UpdateCourse(course *models.Course) error
	GetCourseById(id string) (course *models.Course, err error)
	GetAllCourses() (courses []*models.Course, err error)
	DeleteCourse(id string) error
}