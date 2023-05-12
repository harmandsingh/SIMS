package utils

import (
	"strings"

	"golang.org/x/crypto/bcrypt"
)

func NormalizeEmail(email string) string {
	return strings.TrimSpace(strings.ToLower(email))
}

func NormalizeUsername(username string) string {
	return strings.TrimSpace(strings.ToLower(username))
}

func EncryptPassword(password string) (string, error){
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashed), nil
}

func VerifyPassword(hashed, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashed), []byte(password))
}

type JError struct {
	Error string `json:"error" bson:"error"`
}

func NewJError(err error) JError {
	jerr := JError{"generic error"}
	if err != nil {
		jerr.Error = err.Error()
	}
	return jerr
}