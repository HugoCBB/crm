package user

import (
	"time"

	"github.com/crm/api/internal/domain"
	"github.com/crm/api/pkg/hash"
	"github.com/crm/api/pkg/jwt"
)

type (
	IUserUsecase interface {
		Register(payload *domain.User) error
		Login(payload *domain.User) (string, error)
		FindAllUser(payload *[]domain.User) (*[]domain.User, error)
		DeleteUser(payload *domain.User, id string) error
	}

	UserUsecase struct {
		Repo IUserRepository
	}
)

func (r *UserUsecase) Register(payload *domain.User) error {
	hashedPassword, err := hash.HashPassword(payload.Password)
	if err != nil {
		return err
	}

	existingUser, err := r.Repo.GetUserByEmail(payload.Email)
	if err != nil {
		return domain.ErrInternalError
	}

	if existingUser != nil {
		return domain.ErrEmailAlreadyExists
	}

	user := domain.User{
		Name:       payload.Name,
		Email:      payload.Email,
		Password:   hashedPassword,
		Roles:      domain.USER,
		CreateDate: time.Now().Format("02/01/2006"),
	}

	_, err = r.Repo.Save(&user)
	if err != nil {
		return domain.ErrInternalError
	}
	return nil

}

func (r *UserUsecase) Login(payload *domain.User) (string, error) {

	user, err := r.Repo.GetUserByEmail(payload.Email)
	if err != nil {
		return "", domain.ErrInternalError
	}

	if user == nil {
		return "", domain.ErrUserNotFound
	}

	if err := hash.CompareHash(user.Password, payload.Password); err != nil {
		return "", domain.ErrInvalidPassword
	}

	tokenString, err := jwt.GenerateToken(int(user.ID))
	if err != nil {
		return "", domain.ErrInternalError
	}

	return tokenString, nil
}

func (r *UserUsecase) FindAllUser(payload *[]domain.User) (*[]domain.User, error) {
	users, err := r.Repo.FindAllUser(payload)
	if err != nil {
		return nil, domain.ErrInternalError
	}

	return users, nil
}

func (r *UserUsecase) DeleteUser(payload *domain.User, id string) error {
	if err := r.Repo.DeletUserById(payload, id); err != nil {
		return domain.ErrInternalError
	}
	return nil
}
