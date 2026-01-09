package config

import (
	"github.com/crm/backend/internal/modules/leads"
	"github.com/crm/backend/internal/modules/payment"
	"github.com/crm/backend/internal/modules/schedule"
	"github.com/crm/backend/internal/modules/user"
	"gorm.io/gorm"
)

type Dependency struct {
	UserController     *user.UserController
	LeadsController    *leads.LeadsController
	PaymentController  *payment.PaymentController
	ScheduleController *schedule.ScheduleController
}

func SetupDependency(db *gorm.DB) *Dependency {
	// User
	userRepo := user.NewUserRepository(db)
	userUsecase := &user.UserUsecase{Repo: userRepo}
	userController := &user.UserController{Repo: userUsecase}

	// Leads
	leadsRepo := leads.NewLeadsRepository(db)
	leadsUsecase := &leads.LeadsUsecase{Repo: leadsRepo}
	leadsController := &leads.LeadsController{Repo: leadsUsecase}

	// Payment
	paymentRepo := payment.NewPaymentRepository(db)
	paymentUsecase := &payment.PaymentUsecase{Repo: paymentRepo}
	paymentController := &payment.PaymentController{Repo: paymentUsecase}

	// Schedule
	scheduleRepo := schedule.NewScheduleRepository(db)
	scheduleUsecase := &schedule.ScheduleUsecase{Repo: scheduleRepo}
	scheduleController := &schedule.ScheduleController{Usecase: scheduleUsecase}

	return &Dependency{
		UserController:     userController,
		LeadsController:    leadsController,
		PaymentController:  paymentController,
		ScheduleController: scheduleController,
	}
}
