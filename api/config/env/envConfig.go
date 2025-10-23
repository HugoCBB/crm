package env

import (
	"log"

	"github.com/joho/godotenv"
)

func LoadEnv() error {
	if err := godotenv.Load(".env.dev"); err != nil {
		log.Fatal("Erro ao procurar arquivo .env")
		return err
	}
	return nil
}
