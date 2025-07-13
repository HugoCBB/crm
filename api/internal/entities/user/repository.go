package user

import (
	"fmt"
	"log"

	"gorm.io/gorm"
)

type IUserRepository interface {
	Save(user *User) (*User, error)
	FindAllUser(user *[]User) (*[]User, error)
}

type UserRepository struct {
	DB *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{DB: db}
}

func (u *UserRepository) Save(user *User) (*User, error) {
	if err := u.DB.Create(&user).Error; err != nil {
		fmt.Println("Erro ao salvar usuario")
		return nil, err
	}
	return user, nil
}

func (u *UserRepository) FindAllUser(user *[]User) (*[]User, error) {
	if err := u.DB.Find(&user).Error; err != nil {
		log.Fatal("Erro ao procurar usuarios")
		return nil, err
	}
	return user, nil
}
