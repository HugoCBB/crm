package user

import (
	"net/http"
	"time"

	"github.com/crm/api/domain"
	"github.com/crm/api/pkg/hash"
	"github.com/gin-gonic/gin"
)

type UserController struct {
	Repo IUserRepository
}

func (ur *UserController) Register(c *gin.Context) {
	var payload domain.User

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao decodificar dados",
			"error":   err,
		})
		return
	}

	hashedPassword, err := hash.HashPassword(payload.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Erro ao gerar hash da senha",
			"error":   err,
		})
		return
	}

	user := domain.User{
		Name:       payload.Name,
		Email:      payload.Email,
		Password:   hashedPassword,
		Roles:      domain.USER,
		CreateDate: time.Now().Format("02/01/2006"),
	}

	newUser, err := ur.Repo.Save(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Erro ao salvar usuário",
			"error":   err,
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Usuário cadastrado com sucesso",
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
