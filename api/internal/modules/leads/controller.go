package leads

import (
	"net/http"

	"github.com/crm/api/internal/domain"
	"github.com/gin-gonic/gin"
)

type LeadsController struct {
	Repo ILeadsUsecase
}

func (u *LeadsController) CreateLead(c *gin.Context) {
	var payload domain.Leads

	if err := c.ShouldBindBodyWithJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao cadastrar um novo Leadse",
			"error":   err})
		return
	}
	id, err := u.Repo.CreateLead(&payload)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao criar um novo lead",
			"error":   err,
		})

	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Lead adicionado com sucesso",
		"id":      id,
	})

}
