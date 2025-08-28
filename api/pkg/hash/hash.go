package hash

import (
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hash), err
}

func CompareHash(payload, userPassword string) error {
	if err := bcrypt.CompareHashAndPassword([]byte(userPassword), []byte(payload)); err != nil {
		return err
	}
	return nil

}
