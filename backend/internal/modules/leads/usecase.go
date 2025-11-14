package leads

import (
	"time"

	"github.com/crm/backend/internal/domain"
)

type (
	ILeadsUsecase interface {
		CreateLead(payload *domain.Leads) (int, error)
		FindLeads() ([]domain.Leads, error)
	}

	LeadsUsecase struct {
		Repo ILeadsRepository
	}
)

func (l *LeadsUsecase) CreateLead(payload *domain.Leads) (int, error) {
	payload.CreateDate = time.Now().Format("02/01/2006")
	lead, err := l.Repo.Save(payload)
	if err != nil {
		return 0, err
	}
	return int(lead.ID), nil
}

func (l *LeadsUsecase) FindLeads() ([]domain.Leads, error) {
	leads, err := l.Repo.FindAllLeads()
	if err != nil {
		return nil, err
	}
	return leads, nil

}
