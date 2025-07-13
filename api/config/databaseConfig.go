package config

import "os"

type databaseConfig struct {
	Host, User, Password, Name, Port string
}

func NewDatabaseConfig() *databaseConfig {
	return &databaseConfig{
		Host:     os.Getenv("DATABASE_HOST"),
		User:     os.Getenv("DATABASE_USER"),
		Password: os.Getenv("DATABASE_PASS"),
		Name:     os.Getenv("DATABASE_NAME"),
		Port:     os.Getenv("DATABASE_PORT"),
	}
}
