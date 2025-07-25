package internal

import (
	"fmt"

	"github.com/crm/api/internal/database"
	"github.com/crm/api/internal/entities/client"
	"github.com/crm/api/internal/entities/payament"
	"github.com/crm/api/internal/entities/user"
	"github.com/gin-gonic/gin"
)

func HandleRequests() {
	r := gin.Default()

	// Injecao das dependencias do repositorio
	userRepo := user.NewUserRepository(database.DB)
	userController := &user.UserController{Repo: userRepo}

	clientRepo := client.NewClientRepository(database.DB)
	clientController := &client.ClientController{Repo: clientRepo}

	payamentRepo := payament.NewClientRepository(database.DB)
	payamentController := &payament.PayamentController{Repo: payamentRepo}

	api := r.Group("api/")
	{
		users := api.Group("/user")
		{
			users.POST("/", userController.CreateUser)
			users.GET("/", userController.FindAllUser)

		}

		client := api.Group("/clients")
		{
			client.POST("/", clientController.CreateClient)
		}

		payament := api.Group("/payament")
		{
			payament.POST("/", payamentController.CreatePayament)
		}
	}
	fmt.Println("Servidor rodando na porta 8080")
	r.Run(":8080")
}
