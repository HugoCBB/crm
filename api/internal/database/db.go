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
	// cfg := config.NewDatabaseCosnfig()
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		// cfg.Host,
		// cfg.User,
		// cfg.Password,
		// cfg.Name,
		// cfg.Port,
		"dpg-d27bks6uk2gs73e018rg-a",
		"hugocbb",
		"TJGApW2qflOtdvXtOAIh3sdtrdA1JKuD",
		"crm_j2q0",
		"5432",
	)

	DB, err = gorm.Open(postgres.Open(dsn))

	if err != nil {
		return nil, err
	}

	DB.AutoMigrate(&domain.User{}, &domain.Client{}, &domain.Payment{})
	return DB, nil
}
