package client

import (
	"github.com/crm/api/internal/database/models"
	"gorm.io/gorm"
)

type IClientRepository interface {
	Save(client *models.Client) (*models.Client, error)
}

type ClientRepository struct {
	DB *gorm.DB
}

func NewClientRepository(db *gorm.DB) *ClientRepository {
	return &ClientRepository{DB: db}
}

func (u *ClientRepository) Save(client *models.Client) (*models.Client, error) {
	if err := u.DB.Create(&client).Error; err != nil {
		return nil, err
	}
	return client, nil
}
