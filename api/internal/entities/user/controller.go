package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	Repo IUserRepository
}

func (ur *UserController) CreateUser(c *gin.Context) {
	var u User

	if err := c.ShouldBindBodyWithJSON(&u); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao cadastrar usuario",
			"error":   err})
		return

	}
	user, err := ur.Repo.Save(&u)

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

func (ur *UserController) FindAllUser(c *gin.Context) {
	var u []User
	user, err := ur.Repo.FindAllUser(&u)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": user,
	})
}
