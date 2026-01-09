package env

import (
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	if os.Getenv("RENDER") == "" {
		godotenv.Load()
	}
	godotenv.Load()
}
