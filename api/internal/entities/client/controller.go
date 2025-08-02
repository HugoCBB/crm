package client

import (
	"net/http"

	"github.com/crm/api/internal/domain"
	"github.com/gin-gonic/gin"
)

type ClientController struct {
	Repo IClientRepository
}

func (u *ClientController) CreateClient(c *gin.Context) {
	var client domain.Client

	if err := c.ShouldBindBodyWithJSON(&client); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao cadastrar um novo client",
			"error":   err})
		return
	}
	newClient, err := u.Repo.Save(&client)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao cadastrar um novo cliente",
			"error":   err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": newClient,
	})

}
