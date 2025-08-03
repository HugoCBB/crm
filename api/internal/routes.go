package internal

import (
	"fmt"

	"github.com/crm/api/config"
	"github.com/crm/api/internal/database"
	"github.com/gin-gonic/gin"
)

func HandleRequests() {
	r := gin.Default()

	deps := config.SetupDependency(database.DB)

	api := r.Group("api/")
	{
		users := api.Group("/user")
		{
			users.POST("/", deps.UserController.CreateUser)
			users.GET("/", deps.UserController.FindAllUser)

		}

		client := api.Group("/clients")
		{
			client.POST("/", deps.ClientController.CreateClient)
		}

		payment := api.Group("/payment")
		{
			payment.POST("/", deps.PaymentController.Createpayment)
			payment.PUT("/:id", deps.PaymentController.ModifyPayment)
		}
	}
	fmt.Println("Servidor rodando na porta 8080")
	r.Run(":8080")
}
