package user

import (
	"errors"

	"github.com/crm/api/internal/domain"
	"gorm.io/gorm"
)

type (
	IUserRepository interface {
		Save(user *domain.User) (*domain.User, error)
		FindAllUser(user *[]domain.User) (*[]domain.User, error)
		GetUserByEmail(user string) (*domain.User, error)
		DeletUserById(user *domain.User, id string) error
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
	if err := u.DB.Preload("Leads.Payments").Find(&user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func (u *UserRepository) GetUserByEmail(email string) (*domain.User, error) {
	var user domain.User
	if err := u.DB.Where("email = ?", email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

func (u *UserRepository) DeletUserById(user *domain.User, id string) error {
	if err := u.DB.Delete(&user, id).Error; err != nil {
		return err
	}
	return nil

}
