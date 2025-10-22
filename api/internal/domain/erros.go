package domain

import "errors"

var (
	ErrEmailAlreadyExists = errors.New("email já está em uso")
	ErrInvalidPassword    = errors.New("email ou senha inválida")
	ErrUserNotFound       = errors.New("usuário não encontrado")
	ErrInternalError      = errors.New("erro inesperado")
)
