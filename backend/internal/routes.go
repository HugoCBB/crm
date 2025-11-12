package internal

import (
	"fmt"

	"github.com/crm/backend/config/database"
	"github.com/crm/backend/config/dependencys"
	"github.com/crm/backend/internal/middleware"
	"github.com/gin-gonic/gin"
)

func HandleRequests() {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	deps := dependencys.SetupDependency(database.DB)

	api := r.Group("/api")
	{
		users := api.Group("/users")
		{
			users.POST("/register", deps.UserController.RegisterUser)
			users.POST("/login", deps.UserController.Login)
			users.DELETE("/:id", deps.UserController.DeleteUser)
			users.GET("/", deps.UserController.FindAllUser)

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
