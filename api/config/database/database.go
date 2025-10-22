package database

import (
	"fmt"
	"log"

	"github.com/crm/api/internal/domain"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	DB  *gorm.DB
	err error
)

func ConnectDatabase() error {
	DB, err = openDatabase()

	if err != nil {
		log.Fatal("Erro ao se conectar com o banco de dados")
		return err
	}
	fmt.Println("Conexao estabelecida com o banco de dados")
	return nil
}

func openDatabase() (*gorm.DB, error) {
	cfg := NewDatabaseConfig()
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		cfg.Host,
		cfg.User,
		cfg.Password,
		cfg.Name,
		cfg.Port,
	)

	DB, err = gorm.Open(postgres.Open(dsn))

	if err != nil {
		return nil, err
	}

	DB.AutoMigrate(&domain.User{}, &domain.Leads{}, &domain.Payment{})
	return DB, nil
}
