package payment

import (
	"net/http"
	"strconv"

	"github.com/crm/backend/internal/domain"
	"github.com/gin-gonic/gin"
)

type PaymentController struct {
	Repo IPaymentUsecase
}

func (p *PaymentController) Createpayment(c *gin.Context) {
	var payload domain.Payment
	if err := c.ShouldBindBodyWithJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao gerar pagamento",
			"error":   err.Error(),
		})
		return
	}
	payment, err := p.Repo.Createpayment(&payload)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao gerar pagamento",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Pagamentos cadastrados com sucesso",
		"data":    payment,
	})

}

func (p *PaymentController) ModifyPayment(c *gin.Context) {
	var payload domain.Payment
	if err := c.ShouldBindBodyWithJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao ler dados do pagamento",
			"error":   err.Error(),
		})
		return
	}
	id := c.Param("id")
	newId, _ := strconv.Atoi(id)

	payment, err := p.Repo.ModifyPayment(&payload, newId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao modificar pagamento",
			"error":   err.Error(),
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Pagamento modificado com sucesso",
		"data":    payment,
	})

}

func (p *PaymentController) FindAll(c *gin.Context) {
	userIdUntyped, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Usuário não autenticado",
		})
		return
	}

	userId := userIdUntyped.(int)

	payments, err := p.Repo.FindAll(userId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Erro ao buscar pagamentos",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, payments)
}
