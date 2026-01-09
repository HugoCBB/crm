package main

import (
	"github.com/crm/backend/config"
	"github.com/crm/backend/internal"
)

func init() {
	config.LoadEnv()
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
	config.ConnectDatabase()
	internal.HandleRequests()
}
