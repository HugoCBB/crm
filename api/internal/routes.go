package internal

import (
	"fmt"

	"github.com/crm/api/config/database"
	"github.com/crm/api/config/dependencys"
	"github.com/gin-gonic/gin"
)

func HandleRequests() {
	r := gin.Default()

	deps := dependencys.SetupDependency(database.DB)

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
