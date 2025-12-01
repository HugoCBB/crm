package payment

import (
	"fmt"
	"time"

	"github.com/crm/backend/internal/domain"
)

type (
	IPaymentUsecase interface {
		Createpayment(payload *domain.Payment) (*domain.Payment, error)
		ModifyPayment(payload *domain.Payment, id int) (*domain.Payment, error)
		FindAll(userId int) ([]domain.Payment, error)
	}

	PaymentUsecase struct {
		Repo IPaymentRepository
	}
)

func (p *PaymentUsecase) Createpayment(payload *domain.Payment) (*domain.Payment, error) {
	if (payload.Status != domain.PENDENTE) && (payload.Status != domain.VENCIDO) && (payload.Status != domain.PAGO) {
		return nil, fmt.Errorf("status de pagamento invalido: %v", payload.Status)
	}

	payment := domain.Payment{
		ID:         payload.ID,
		Value:      payload.Value,
		Type:       payload.Type,
		FinalDate:  payload.FinalDate,
		Status:     domain.PENDENTE,
		LeadsID:    payload.LeadsID,
		CreateDate: time.Now().Format("2006-01-02"),
	}

	savedPayment, err := p.Repo.Save(&payment)
	if err != nil {
		return nil, err
	}

	return savedPayment, nil
}

func (p *PaymentUsecase) ModifyPayment(payload *domain.Payment, id int) (*domain.Payment, error) {
	payment, err := p.Repo.PutPayment(payload, id)
	if err != nil {
		return nil, err
	}
	return payment, nil
}

func (p *PaymentUsecase) FindAll(userId int) ([]domain.Payment, error) {
	return p.Repo.FindAll(userId)
}
