package client

import (
	"github.com/crm/api/internal/domain"
	"gorm.io/gorm"
)

type (
	IClientRepository interface {
		Save(client *domain.Client) (*domain.Client, error)
	}
	ClientRepository struct {
		DB *gorm.DB
	}
)

func NewClientRepository(db *gorm.DB) *ClientRepository {
	return &ClientRepository{DB: db}
}

func (u *ClientRepository) Save(client *domain.Client) (*domain.Client, error) {
	if err := u.DB.Create(&client).Error; err != nil {
		return nil, err
	}
	return client, nil
}
