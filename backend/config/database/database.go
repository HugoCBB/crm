package database

import (
	"fmt"
	"log"

	"github.com/crm/backend/internal/domain"
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
	// var dsn string
	cfg := NewDatabaseConfig()
	fmt.Println(cfg)

	dsn := "host=db user=postgres password=root dbname=crm port=5432"
	// if cfg == nil {
	// } else {
	// 	dsn = fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s ",
	// 		cfg.Host,
	// 		cfg.User,
	// 		cfg.Password,
	// 		cfg.Name,
	// 		cfg.Port,
	// 	)
	// }

	log.Printf("Attempting to connect to database host=%s user=%s dbname=%s port=%s", cfg.Host, cfg.User, cfg.Name, cfg.Port)

	DB, err = gorm.Open(postgres.Open(dsn))

	if err != nil {
		log.Printf("Failed to connect to database: %v", err)
		return nil, err
	}

	DB.AutoMigrate(&domain.User{}, &domain.Leads{}, &domain.Payment{}, &domain.Schedule{})
	return DB, nil
}
