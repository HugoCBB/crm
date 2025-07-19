package payament

import (
	"github.com/crm/api/internal/domain"
	"gorm.io/gorm"
)

type (
	IPayamentRepository interface {
		Save(payament *domain.Payment) (*domain.Payment, error)
	}

	PayamentRepository struct {
		DB *gorm.DB
	}
)

func NewClientRepository(db *gorm.DB) *PayamentRepository {
	return &PayamentRepository{DB: db}
}

func (p *PayamentRepository) Save(payament *domain.Payment) (*domain.Payment, error) {
	if err := p.DB.Create(&payament).Error; err != nil {
		return nil, err
	}
	return payament, nil
}
