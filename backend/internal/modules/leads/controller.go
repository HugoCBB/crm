package leads

import (
	"net/http"

	"github.com/crm/backend/internal/domain"
	"github.com/gin-gonic/gin"
)

type LeadsController struct {
	Repo ILeadsUsecase
}

func (u *LeadsController) CreateLead(c *gin.Context) {
	var payload domain.Leads

	userId, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Usuário não autenticado"})
		return
	}

	if err := c.ShouldBindBodyWithJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao cadastrar um novo Leadse",
			"error":   err})
		return
	}
	leads, err := u.Repo.CreateLead(&payload, userId.(int))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao criar um novo lead",
			"error":   err,
		})

	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Lead adicionado com sucesso",
		"data":    leads,
	})

}

func (u LeadsController) FindLeads(c *gin.Context) {
	userIdUntyped, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Usuário não autenticado",
		})
		return
	}

	userId, ok := userIdUntyped.(int)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Erro interno ao processar ID do usuário",
		})
		return
	}

	leads, err := u.Repo.FindLeads(userId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao buscar leads",
		})
		return
	}
	c.JSON(http.StatusOK, leads)
}

func (u LeadsController) UpdateLeadById(c *gin.Context) {
	var payload *domain.Leads

	leads, err := u.Repo.UpdateLeads(payload)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao atualizar lead",
		})
	}

	c.JSON(http.StatusOK, leads)
}
