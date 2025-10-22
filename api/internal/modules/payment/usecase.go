package payment

import (
	"time"

	"github.com/crm/api/internal/domain"
)

type (
	IPaymentUsecase interface {
		Createpayment(payload *domain.Payment) (*domain.Payment, error)
		ModifyPayment(payload *domain.Payment, id int) (*domain.Payment, error)
	}

	PaymentUsecase struct {
		Repo IPaymentRepository
	}
)

func (p *PaymentUsecase) Createpayment(payload *domain.Payment) (*domain.Payment, error) {
	payment := domain.Payment{
		ID:         payload.ID,
		Value:      payload.Value,
		Type:       payload.Type,
		FinalDate:  payload.FinalDate,
		Status:     payload.Status,
		LeadsID:    payload.LeadsID,
		CreateDate: time.Now().Format("02/01/2006"),
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
