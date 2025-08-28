package user

import (
	"net/http"
	"time"

	"github.com/crm/api/domain"
	"github.com/crm/api/pkg/hash"
	"github.com/crm/api/pkg/jwt"
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

func (ur *UserController) Login(c *gin.Context) {
	var payload domain.User

	if err := c.ShouldBindBodyWithJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao decodificar dados",
			"error":   err.Error(),
		})
		return
	}
	user := ur.Repo.GetUserByEmail(payload.Email)
	if user == nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Credenciais inválidas",
		})
		return
	}

	if err := hash.CompareHash(user.Password, payload.Password); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Senha invalida",
			"error":   err.Error(),
		})
		return
	}

	tokenString, err := jwt.GenerateToken(int(payload.ID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
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
	newUser, err := ur.Repo.FindAllUser(&payload)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": newUser,
	})
}
