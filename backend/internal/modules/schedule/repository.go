package schedule

import (
	"github.com/crm/backend/internal/domain"
	"gorm.io/gorm"
)

type (
	IScheduleRepository interface {
		Create(schedule *domain.Schedule) (*domain.Schedule, error)
		FindAll(userId int) ([]domain.Schedule, error)
	}

	scheduleRepository struct {
		DB *gorm.DB
	}
)

func NewScheduleRepository(db *gorm.DB) *scheduleRepository {
	return &scheduleRepository{DB: db}
}

func (r *scheduleRepository) Create(schedule *domain.Schedule) (*domain.Schedule, error) {
	if err := r.DB.Create(&schedule).Error; err != nil {
		return nil, err
	}
	return schedule, nil
}

func (r *scheduleRepository) FindAll(userId int) ([]domain.Schedule, error) {
	var schedules []domain.Schedule
	if err := r.DB.Preload("Lead").Joins("JOIN leads ON leads.id = schedules.lead_id").Where("leads.user_id = ?", userId).Find(&schedules).Error; err != nil {
		return nil, err
	}
	return schedules, nil
}
