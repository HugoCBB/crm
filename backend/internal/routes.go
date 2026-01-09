package internal

import (
	"context"
	"fmt"

	"github.com/crm/backend/config"
	"github.com/crm/backend/internal/middleware"
	"github.com/gin-gonic/gin"

	_ "github.com/crm/backend/docs"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func HandleRequests() {
	ctx := context.Background()
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	deps := config.SetupDependency(config.DB)

	rdb := config.NewClientRedis(ctx)

	r.GET("/docs", ginSwagger.WrapHandler(swaggerFiles.Handler))
	r.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	api := r.Group("/api")
	{
		users := api.Group("/users", middleware.RateLimitMiddleware(rdb))
		{
			users.POST("/register", deps.UserController.RegisterUser)
			users.POST("/login", deps.UserController.Login)
			users.DELETE("/:id", deps.UserController.DeleteUser)
			users.GET("/", deps.UserController.FindAllUser)

		}

		leads := api.Group("/leads", middleware.RequireAuth)
		{
			leads.POST("/", deps.LeadsController.CreateLead)
			leads.GET("/", deps.LeadsController.FindLeads)
		}

		payment := api.Group("/payment", middleware.RequireAuth)
		{
			payment.POST("/", deps.PaymentController.Createpayment)
			payment.PUT("/:id", deps.PaymentController.ModifyPayment)
			payment.GET("/", deps.PaymentController.FindAll)
		}

		schedule := api.Group("/schedules", middleware.RequireAuth)
		{
			schedule.POST("/", deps.ScheduleController.CreateSchedule)
			schedule.GET("/", deps.ScheduleController.FindAll)
		}
	}

	fmt.Println("Servidor rodando na porta 8080")
	r.Run(":8080")
}
