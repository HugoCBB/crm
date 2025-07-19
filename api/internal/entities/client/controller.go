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
	var cli domain.Client

	if err := c.ShouldBindBodyWithJSON(&cli); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao cadastrar um novo client",
			"error":   err})
		return
	}
	client, err := u.Repo.Save(&cli)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao cadastrar um novo cliente",
			"error":   err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": client,
	})

}
