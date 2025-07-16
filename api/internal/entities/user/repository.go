package user

import (
	"github.com/crm/api/internal/database/models"
	"gorm.io/gorm"
)

type IUserRepository interface {
	Save(user *models.User) (*models.User, error)
	FindAllUser(user *[]models.User) (*[]models.User, error)
}

type UserRepository struct {
	DB *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{DB: db}
}

func (u *UserRepository) Save(user *models.User) (*models.User, error) {
	user.Type = "DEFAULT_USER"

	if err := u.DB.Create(&user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func (u *UserRepository) FindAllUser(user *[]models.User) (*[]models.User, error) {
	if err := u.DB.Preload("Clients").Find(&user).Error; err != nil {
		return nil, err
	}
	return user, nil
}
