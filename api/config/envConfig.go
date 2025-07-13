package config

import (
	"log"

	"github.com/joho/godotenv"
)

func LoadEnv() error {
	err := godotenv.Load("../.env")

	if err != nil {
		log.Fatal("Erro ao procurar arquivo .env")
		return err
	}

	return nil
}
