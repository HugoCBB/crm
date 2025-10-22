package leads

import (
	"github.com/crm/api/internal/domain"
	"gorm.io/gorm"
)

type (
	ILeadsRepository interface {
		Save(Leads *domain.Leads) (*domain.Leads, error)
	}
	LeadsRepository struct {
		DB *gorm.DB
	}
)

func NewLeadsRepository(db *gorm.DB) *LeadsRepository {
	return &LeadsRepository{DB: db}
}

func (u *LeadsRepository) Save(leads *domain.Leads) (*domain.Leads, error) {
	if err := u.DB.Create(&leads).Error; err != nil {
		return nil, err
	}
	return leads, nil
}
