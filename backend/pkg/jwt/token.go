package jwt

import (
	"time"

	"github.com/crm/backend/config/token"
	"github.com/golang-jwt/jwt/v5"
)

func GenerateToken(userId int) (string, error) {
	tokenKey := token.NewTokenConfig()

	claims := jwt.MapClaims{
		"sub": userId,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(tokenKey.Secret_key))
}
