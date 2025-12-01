package payment

import (
	"github.com/crm/backend/internal/domain"
	"gorm.io/gorm"
)

type (
	IPaymentRepository interface {
		Save(payment *domain.Payment) (*domain.Payment, error)
		PutPayment(payment *domain.Payment, id int) (*domain.Payment, error)
		FindAll(userId int) ([]domain.Payment, error)
	}

	paymentRepository struct {
		DB *gorm.DB
	}
)

func NewPaymentRepository(db *gorm.DB) *paymentRepository {
	return &paymentRepository{DB: db}
}

func (p *paymentRepository) Save(payment *domain.Payment) (*domain.Payment, error) {
	if err := p.DB.Create(&payment).Error; err != nil {
		return nil, err
	}
	return payment, nil
}

func (p *paymentRepository) PutPayment(payment *domain.Payment, id int) (*domain.Payment, error) {
	var existingPayment domain.Payment
	if err := p.DB.First(&existingPayment, id).Error; err != nil {
		return nil, err
	}

	existingPayment.Value = payment.Value
	existingPayment.Type = payment.Type
	existingPayment.Status = payment.Status
	existingPayment.FinalDate = payment.FinalDate

	if err := p.DB.Save(&existingPayment).Error; err != nil {
		return nil, err
	}
	return &existingPayment, nil
}

func (p *paymentRepository) FindAll(userId int) ([]domain.Payment, error) {
	var payments []domain.Payment
	if err := p.DB.Preload("Lead").Joins("JOIN leads ON leads.id = payments.leads_id").Where("leads.user_id = ?", userId).Find(&payments).Error; err != nil {
		return nil, err
	}
	return payments, nil
}
