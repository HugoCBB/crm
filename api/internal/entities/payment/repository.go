package payment

import (
	"github.com/crm/api/internal/domain"
	"gorm.io/gorm"
)

type (
	IpaymentRepository interface {
		Save(payment *domain.Payment) (*domain.Payment, error)
		PutPayment(payment *domain.Payment, id int) (*domain.Payment, error)
	}

	paymentRepository struct {
		DB *gorm.DB
	}
)

func NewPaymentRepository(db *gorm.DB) *paymentRepository {
	return &paymentRepository{DB: db}
}

func (p *paymentRepository) Save(payment *domain.Payment) (*domain.Payment, error) {
	payment.Type = "PENDENTE"
	if err := p.DB.Create(&payment).Error; err != nil {
		return nil, err
	}
	return payment, nil
}

func (p *paymentRepository) PutPayment(payment *domain.Payment, id int) (*domain.Payment, error) {
	if err := p.DB.First(&payment, id).Error; err != nil {
		return nil, err
	}
	return payment, nil
}
