package middleware

import (
	"net/http"
	"time"

	"github.com/crm/api/config/database"
	"github.com/crm/api/config/token"
	"github.com/crm/api/internal/domain"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func RequireAuth(c *gin.Context) {

	tokenKey := token.NewTokenConfig()
	tokenString, err := c.Cookie("Authorization")

	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(tokenKey.Secret_key), nil
	}, jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}))
	if err != nil || !token.Valid {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		var user domain.User
		database.DB.First(&user, claims["sub"])
		if user.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		c.Set("user", user)
		c.Next()
	} else {
		c.AbortWithStatus(http.StatusUnauthorized)

	}
}
