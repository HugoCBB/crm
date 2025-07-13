package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

var repo IUserRepository

func CreateUser(c *gin.Context) {
	var u User

	if err := c.ShouldBindBodyWithJSON(&u); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao cadastrar usuario",
			"error":   err})
		return

	}

	user, err := repo.save(&u)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao cadastrar usuario",
			"error":   err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Usuario cadastrado com sucesso",
		"data":    user,
	})
}
