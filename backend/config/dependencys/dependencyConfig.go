package dependencys

import (
	"github.com/crm/backend/internal/modules/leads"
	"github.com/crm/backend/internal/modules/payment"
	"github.com/crm/backend/internal/modules/user"
	"gorm.io/gorm"
)

type dependency struct {
	UserController    *user.UserController
	LeadsController   *leads.LeadsController
	PaymentController *payment.PaymentController
}

func SetupDependency(db *gorm.DB) *dependency {
	userRepository := user.NewUserRepository(db)
	leadsRepository := leads.NewLeadsRepository(db)
	paymentRepository := payment.NewPaymentRepository(db)

	userUsecase := &user.UserUsecase{Repo: userRepository}
	paymentUsecase := &payment.PaymentUsecase{Repo: paymentRepository}
	leadsUsecase := &leads.LeadsUsecase{Repo: leadsRepository}

	userController := &user.UserController{Repo: userUsecase}
	leadsController := &leads.LeadsController{Repo: leadsUsecase}
	paymentController := &payment.PaymentController{Repo: paymentUsecase}

	return &dependency{
		UserController:    userController,
		LeadsController:   leadsController,
		PaymentController: paymentController,
	}
}
