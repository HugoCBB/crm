package payament

import (
	"net/http"

	"github.com/crm/api/internal/domain"
	"github.com/gin-gonic/gin"
)

type PayamentController struct {
	Repo IPayamentRepository
}

func (p *PayamentController) CreatePayament(c *gin.Context) {
	var pya domain.Payment
	if err := c.ShouldBindBodyWithJSON(&pya); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao gerar pagamento",
			"error":   err.Error(),
		})
		return
	}

	payament, err := p.Repo.Save(&pya)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao gerar pagamento",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Pagamentos cadastrados com sucesso",
		"data":    payament,
	})

}
