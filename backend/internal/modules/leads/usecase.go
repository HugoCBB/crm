package leads

import (
	"time"

	"github.com/crm/backend/internal/domain"
)

type (
	ILeadsUsecase interface {
		CreateLead(payload *domain.Leads, userId int) (*domain.Leads, error)
		FindLeads(userId int) ([]domain.Leads, error)
	}

	LeadsUsecase struct {
		Repo ILeadsRepository
	}
)

func (l *LeadsUsecase) CreateLead(payload *domain.Leads, userId int) (*domain.Leads, error) {
	payload.CreateDate = time.Now().Format("02/01/2006")
	payload.UserID = uint(userId)
	lead, err := l.Repo.Save(payload)
	if err != nil {
		return nil, err
	}
	return lead, nil
}

func (l *LeadsUsecase) FindLeads(userId int) ([]domain.Leads, error) {
	leads, err := l.Repo.FindAllLeads(userId)
	if err != nil {
		return nil, err
	}
	return leads, nil

}
