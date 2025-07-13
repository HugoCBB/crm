package internal

import (
	"fmt"

	"github.com/crm/api/internal/entities/database"
	"github.com/crm/api/internal/entities/user"
	"github.com/gin-gonic/gin"
)

func HandleRequests() {
	r := gin.Default()

	// Injecao das dependencias do repositorio
	userRepo := user.NewUserRepository(database.DB)
	userController := &user.UserController{Repo: userRepo}

	api := r.Group("api/")
	{
		users := api.Group("/user")
		{
			users.POST("/", userController.CreateUser)
			users.GET("/", userController.FindAllUser)

		}
	}
	fmt.Println("Servidor rodando na porta 8080")
	r.Run(":8080")
}
