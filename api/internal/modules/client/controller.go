package client

import (
	"net/http"

	"github.com/crm/api/domain"
	"github.com/gin-gonic/gin"
)

type ClientController struct {
	Repo IClientRepository
}

func (u *ClientController) CreateClient(c *gin.Context) {
	var payload domain.Client

	if err := c.ShouldBindBodyWithJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao cadastrar um novo client",
			"error":   err})
		return
	}
	client, err := u.Repo.Save(&payload)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao cadastrar um novo cliente",
			"error":   err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Cliente adicionado com sucesso",
		"data":    client,
	})

}
