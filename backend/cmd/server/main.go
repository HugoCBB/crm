package main

import (
	"github.com/crm/backend/config/database"
	"github.com/crm/backend/config/env"
	"github.com/crm/backend/internal"
)

func init() {
	env.LoadEnv()
}

// @title CRM Backend API
// @version 1.0
// @description API do CRM (usuarios, leads, pagamentos, agendamentos)
// @host localhost:8080
// @BasePath /api
// @schemes http
//
// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization
// @description Coloque o token no header no formato: "Bearer <token>"

func main() {
	database.ConnectDatabase()
	internal.HandleRequests()
}
