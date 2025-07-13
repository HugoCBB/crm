package user

import "gorm.io/gorm"

type IUserRepository interface {
	save(user *User) (*User, error)
}

type UserRepository struct {
	DB *gorm.DB
}

func (u *UserRepository) save(user *User) (*User, error) {
	if err := u.DB.Create(user).Error; err != nil {
		return nil, err
	}
	return user, nil
}
