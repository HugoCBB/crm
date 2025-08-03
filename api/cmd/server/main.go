package main

import (
	"github.com/crm/api/config/database"
	"github.com/crm/api/config/env"
	"github.com/crm/api/internal"
)

func init() {
	env.LoadEnv()
}

func main() {
	database.ConnectDatabase()
	internal.HandleRequests()
}
