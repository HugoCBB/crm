package dependencys

import (
	"github.com/crm/api/internal/modules/client"
	"github.com/crm/api/internal/modules/payment"
	"github.com/crm/api/internal/modules/user"
	"gorm.io/gorm"
)

type dependency struct {
	UserController    *user.UserController
	ClientController  *client.ClientController
	PaymentController *payment.PaymentController
}

func SetupDependency(db *gorm.DB) *dependency {
	userRepository := user.NewUserRepository(db)
	clientRepository := client.NewClientRepository(db)
	paymentRepository := payment.NewPaymentRepository(db)

	userController := &user.UserController{Repo: userRepository}
	clientController := &client.ClientController{Repo: clientRepository}
	paymentController := &payment.PaymentController{Repo: paymentRepository}

	return &dependency{
		UserController:    userController,
		ClientController:  clientController,
		PaymentController: paymentController,
	}
}
