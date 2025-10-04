package user

import (
	"net/http"

	"github.com/crm/api/domain"
	"github.com/gin-gonic/gin"
)

type UserController struct {
	Repo IUserUsecase
}

func (ur *UserController) RegisterUser(c *gin.Context) {
	var payload domain.User

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao decodificar dados",
			"error":   err,
		})
		return
	}

	err := ur.Repo.Register(&payload)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Usuario cadastrado com sucesso",
	})
}

func (ur *UserController) Login(c *gin.Context) {
	var payload domain.User

	if err := c.ShouldBindBodyWithJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao decodificar dados",
			"error":   err.Error(),
		})
		return
	}

	tokenString, err := ur.Repo.Login(&payload)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{
		"status": "Login realizado com sucesso",
		"token":  tokenString,
	})

}

func (ur *UserController) FindAllUser(c *gin.Context) {
	var payload []domain.User
	users, err := ur.Repo.FindAllUser(&payload)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": users,
	})
}

func (ur *UserController) DeleteUser(c *gin.Context) {
	var payload domain.User
	id := c.Param("id")
	if err := ur.Repo.DeleteUser(&payload, id); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Usuario deletado com sucesso",
	})

}
