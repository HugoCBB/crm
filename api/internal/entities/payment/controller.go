package payment

import (
	"net/http"
	"strconv"

	"github.com/crm/api/internal/domain"
	"github.com/gin-gonic/gin"
)

type PaymentController struct {
	Repo IpaymentRepository
}

func (p *PaymentController) Createpayment(c *gin.Context) {
	var pyment domain.Payment
	if err := c.ShouldBindBodyWithJSON(&pyment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao gerar pagamento",
			"error":   err.Error(),
		})
		return
	}

	newPayment, err := p.Repo.Save(&pyment)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao gerar pagamento",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Pagamentos cadastrados com sucesso",
		"data":    newPayment,
	})

}

func (p *PaymentController) ModifyUser(c *gin.Context) {
	var payment domain.Payment
	id := c.Param("id")
	newId, _ := strconv.Atoi(id)

	newPayment, err := p.Repo.PutPayment(&payment, newId)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao modificar pagamento",
			"error":   err.Error(),
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Pagamento modificado com sucesso",
		"data":    newPayment,
	})

}
