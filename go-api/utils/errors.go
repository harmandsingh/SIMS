package utils

import "errors"

var(
	ErrInvalidEmail = errors.New("invalid email")
	ErrEmailAlreadyExists = errors.New("email already exists")
	ErrEmptyPassword = errors.New("password cannot be empty")
	ErrInvalidAuthToken = errors.New("invalid auth-token")
)