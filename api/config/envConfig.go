package config

import (
	"log"

	"github.com/joho/godotenv"
)

func LoadEnv() error {
	if err := godotenv.Load("../.env"); err != nil {
		log.Fatal("Erro ao procurar arquivo .env")
		return err
	}

	return nil
}
