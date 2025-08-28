package user

import (
	"github.com/crm/api/domain"
	"gorm.io/gorm"
)

type (
	IUserRepository interface {
		Save(user *domain.User) (*domain.User, error)
		FindAllUser(user *[]domain.User) (*[]domain.User, error)
		GetUserByEmail(user string) *domain.User
	}
	UserRepository struct {
		DB *gorm.DB
	}
)

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{DB: db}
}

func (u *UserRepository) Save(user *domain.User) (*domain.User, error) {
	if err := u.DB.Create(&user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func (u *UserRepository) FindAllUser(user *[]domain.User) (*[]domain.User, error) {
	if err := u.DB.Preload("Clients.Payments").Find(&user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func (u *UserRepository) GetUserByEmail(email string) *domain.User {
	var user domain.User
	if err := u.DB.First(&user, "email = ?", email).Error; err != nil {
		return nil
	}
	return &user
}
