package user

import (
	"github.com/crm/api/internal/domain"
	"gorm.io/gorm"
)

type (
	IUserRepository interface {
		Save(user *domain.User) (*domain.User, error)
		FindAllUser(user *[]domain.User) (*[]domain.User, error)
	}
	UserRepository struct {
		DB *gorm.DB
	}
)

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{DB: db}
}

func (u *UserRepository) Save(user *domain.User) (*domain.User, error) {
	user.Type = "DEFAULT_USER"

	if err := u.DB.Create(&user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func (u *UserRepository) FindAllUser(user *[]domain.User) (*[]domain.User, error) {
	if err := u.DB.Preload("Clients").Find(&user).Error; err != nil {
		return nil, err
	}
	return user, nil
}
