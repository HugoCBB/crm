package internal

import (
	"fmt"

	"github.com/crm/api/internal/entities/user"
	"github.com/gin-gonic/gin"
)

func HandleRequests() {
	r := gin.Default()

	api := r.Group("api/")
	{
		users := api.Group("/user")
		{
			users.GET("/", user.CreateUser)

		}
	}
	fmt.Println("Servidor rodando na porta 8080")
	r.Run(":8080")
}
