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
	var u domain.User

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
	var u []domain.User
	user, err := ur.Repo.FindAllUser(&u)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": user,
	})
}
