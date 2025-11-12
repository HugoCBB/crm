package leads

import (
	"github.com/crm/backend/internal/domain"
)

type (
	ILeadsUsecase interface {
		CreateLead(payload *domain.Leads) (int, error)
	}

	LeadsUsecase struct {
		Repo ILeadsRepository
	}
)

func (l *LeadsUsecase) CreateLead(payload *domain.Leads) (int, error) {
	lead, err := l.Repo.Save(payload)
	if err != nil {
		return 0, err
	}
	return int(lead.ID), nil

}
