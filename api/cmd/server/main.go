package main

import (
	"github.com/crm/api/config"
	"github.com/crm/api/internal"
	"github.com/crm/api/internal/entities/database"
)

func init() {
	config.LoadEnv()
}

func main() {
	database.ConnectDatabase()
	internal.HandleRequests()
}
