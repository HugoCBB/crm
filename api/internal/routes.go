package internal

import (
	"fmt"

	"github.com/crm/api/config/database"
	"github.com/crm/api/config/dependencys"
	"github.com/crm/api/internal/middleware"
	"github.com/gin-gonic/gin"
)

func HandleRequests() {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	deps := dependencys.SetupDependency(database.DB)

	api := r.Group("api/")
	{
		users := api.Group("/users")
		{
			users.POST("/register", deps.UserController.RegisterUser)
			users.DELETE("/:id", deps.UserController.DeleteUser)
			users.GET("/", deps.UserController.FindAllUser)
			users.POST("/login", deps.UserController.Login)

		}

		leads := api.Group("/leads", middleware.RequireAuth)
		{
			leads.POST("/", deps.LeadsController.CreateLead)
		}

		payment := api.Group("/payment", middleware.RequireAuth)
		{
			payment.POST("/", deps.PaymentController.Createpayment)
			payment.PUT("/:id", deps.PaymentController.ModifyPayment)
		}
	}
	fmt.Println("Servidor rodando na porta 8080")
	r.Run(":8080")
}
