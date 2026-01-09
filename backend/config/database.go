package config

import (
	"log"
	"os"

	"github.com/crm/backend/internal/domain"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	DB  *gorm.DB
	err error
)

func ConnectDatabase() error {
	dsn := os.Getenv("DB")
	if dsn == "" {
		dsn = "host=localhost user=postgres password=root dbname=crm port=5432"
	}

	DB, err = gorm.Open(postgres.Open(dsn))
	if err != nil {
		log.Fatal("erro ao se conectar ao banco de dados")
	}

	DB.AutoMigrate(&domain.User{}, &domain.Leads{}, &domain.Payment{}, &domain.Schedule{})
	return nil
}
