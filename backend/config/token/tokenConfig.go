package token

import "os"

type tokenConfig struct {
	Secret_key string
}

func NewTokenConfig() *tokenConfig {
	return &tokenConfig{
		Secret_key: os.Getenv("SECRET_KEY"),
	}
}
