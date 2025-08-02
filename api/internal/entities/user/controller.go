package user

import (
	"net/http"

	"github.com/crm/api/internal/domain"
	"github.com/gin-gonic/gin"
)

type UserController struct {
	Repo IUserRepository
}

func (ur *UserController) CreateUser(c *gin.Context) {
	var user domain.User

	if err := c.ShouldBindBodyWithJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao cadastrar usuario",
			"error":   err})
		return
	}
	newUser, err := ur.Repo.Save(&user)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao cadastrar usuario",
			"error":   err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Usuario cadastrado com sucesso",
		"data":    newUser,
	})
}

func (ur *UserController) FindAllUser(c *gin.Context) {
	var user []domain.User
	newUser, err := ur.Repo.FindAllUser(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": newUser,
	})
}
