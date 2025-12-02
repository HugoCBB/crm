package user

import (
	"net/http"

	"github.com/crm/backend/internal/domain"
	"github.com/gin-gonic/gin"
)

type UserController struct {
	Repo IUserUsecase
}

// RegisterUser registra um novo usuário.
// @Summary Registra um novo usuário
// @Tags Users
// @Accept json
// @Produce json
// @Param payload body domain.User true "Dados do usuário"
// @Success 200 {object} map[string]interface{}
// @Failure 400 {object} map[string]string
// @Router /users/register [post]
func (ur *UserController) RegisterUser(c *gin.Context) {
	var payload domain.User

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao decodificar dados",
			"error":   err,
		})
		return
	}

	tokenString, err := ur.Repo.Register(&payload)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Usuario cadastrado com sucesso",
		"token":   tokenString,
	})
}

// Login realiza login e retorna token JWT.
// @Summary Login de usuário
// @Tags Users
// @Accept json
// @Produce json
// @Param payload body domain.User true "Credenciais do usuário"
// @Success 200 {object} map[string]interface{} "token"
// @Failure 400 {object} map[string]string
// @Router /users/login [post]
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

	c.JSON(http.StatusOK, gin.H{
		"status": "Login realizado com sucesso",
		"token":  tokenString,
	})

}

// FindAllUser retorna todos os usuários.
// @Summary Lista todos os usuários
// @Tags Users
// @Accept json
// @Produce json
// @Success 200 {object} map[string]interface{} "lista de usuários"
// @Failure 400 {object} map[string]string
// @Router /users/ [get]
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

// DeleteUser deleta um usuário por id.
// @Summary Deleta usuário por id
// @Tags Users
// @Accept json
// @Produce json
// @Param id path string true "ID do usuário"
// @Success 200 {object} map[string]string
// @Failure 400 {object} map[string]string
// @Router /users/{id} [delete]s
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
