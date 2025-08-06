package user

import (
	"net/http"
	"time"

	"github.com/crm/api/domain"
	"github.com/gin-gonic/gin"
)

type UserController struct {
	Repo IUserRepository
}

func (ur *UserController) CreateUser(c *gin.Context) {
	var payload domain.User

	if err := c.ShouldBindBodyWithJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao cadastrar usuario",
			"error":   err})
		return
	}

	payload.CreateDate = time.Now().Format("02/01/2006")
	newUser, err := ur.Repo.Save(&payload)

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
	var payload []domain.User
	newUser, err := ur.Repo.FindAllUser(&payload)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": newUser,
	})
}
