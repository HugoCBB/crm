package main

import (
	"github.com/crm/backend/config/database"
	"github.com/crm/backend/config/env"
	"github.com/crm/backend/internal"
)

func init() {
	env.LoadEnv()
}

func main() {
	database.ConnectDatabase()
	internal.HandleRequests()
}
