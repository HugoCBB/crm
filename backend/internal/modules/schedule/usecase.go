package schedule

import (
	"github.com/crm/backend/internal/domain"
)

type (
	IScheduleUsecase interface {
		CreateSchedule(payload *domain.Schedule) (*domain.Schedule, error)
		FindAll(userId int) ([]domain.Schedule, error)
	}

	ScheduleUsecase struct {
		Repo IScheduleRepository
	}
)

func (u *ScheduleUsecase) CreateSchedule(payload *domain.Schedule) (*domain.Schedule, error) {
	return u.Repo.Create(payload)
}

func (u *ScheduleUsecase) FindAll(userId int) ([]domain.Schedule, error) {
	return u.Repo.FindAll(userId)
}
