package main

import (
	"github.com/crm/api/internal"
	"github.com/crm/api/internal/database"
)

// func init() {
// 	config.LoadEnv()
// }

func main() {
	database.ConnectDatabase()
	internal.HandleRequests()
}
